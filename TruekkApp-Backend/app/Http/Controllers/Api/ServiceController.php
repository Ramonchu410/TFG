<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // Listado público con filtros del marketplace y ranking por valoraciones.
    public function index(Request $request)
    {
        $query = Service::query()
            ->with(['user:id,name,avatar_path,status', 'category:id,name'])
            ->where('is_active', true)
            ->where('moderation_status', 'APPROVED')
            ->when($request->search, function ($q) use ($request) {
                $search = $request->search;

                $q->where(function ($subQuery) use ($search) {
                    $subQuery
                        ->where('title', 'like', '%' . $search . '%')
                        ->orWhere('description', 'like', '%' . $search . '%')
                        ->orWhere('location', 'like', '%' . $search . '%')
                        ->orWhereHas('category', fn($cat) =>
                            $cat->where('name', 'like', '%' . $search . '%')
                        );
                });
            })
            ->when($request->type, fn($q) => $q->where('type', $request->type))
            ->when($request->category_id, fn($q) => $q->where('category_id', $request->category_id))
            ->when($request->location, fn($q) => $q->where('location', 'like', '%' . $request->location . '%'))
            ->orderByDesc('id');

        $services = $query->paginate(12);

        $services->getCollection()->transform(function ($service) {
            $reviews = Review::query()
                ->where('to_user_id', $service->user_id)
                ->get();

            $service->avg_rating = round($reviews->avg('rating') ?? 0, 1);
            $service->reviews_count = $reviews->count();

            return $service;
        });

        if ($request->sort === 'top') {
            $sorted = $services->getCollection()
                ->sortByDesc(fn($service) => [$service->avg_rating, $service->reviews_count])
                ->values();

            $services->setCollection($sorted);
        }

        return response()->json($services);
    }

    public function store(Request $request)
    {
        if ($request->user()->status === 'BLOCKED') {
            return response()->json([
                'message' => 'Tu cuenta está bloqueada. No puedes publicar servicios.',
            ], 403);
        }

        $data = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'type' => ['required', 'in:OFFER,REQUEST'],
            'title' => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:100'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['user_id'] = $request->user()->id;
        $data['moderation_status'] = 'PENDING';
        $data['reviewed_by'] = null;
        $data['reviewed_at'] = null;
        $data['rejection_reason'] = null;
        $data['is_active'] = $data['is_active'] ?? true;

        $service = Service::create($data);

        return response()->json([
            'message' => 'Servicio creado correctamente. Pendiente de validación.',
            'service' => $service->load(['user:id,name,avatar_path,status', 'category:id,name']),
        ], 201);
    }

    public function myServices(Request $request)
    {
        return response()->json(
            Service::query()
                ->with(['user:id,name,avatar_path,status', 'category:id,name'])
                ->where('user_id', $request->user()->id)
                ->orderByDesc('id')
                ->get()
        );
    }

    public function show(Request $request, Service $service)
    {
        $isOwner = $request->user() && (int) $service->user_id === (int) $request->user()->id;

        if (!$isOwner && (!$service->is_active || $service->moderation_status !== 'APPROVED')) {
            return response()->json(['message' => 'Servicio no encontrado.'], 404);
        }

        $reviews = Review::query()
            ->where('to_user_id', $service->user_id)
            ->get();

        $service->avg_rating = round($reviews->avg('rating') ?? 0, 1);
        $service->reviews_count = $reviews->count();

        return response()->json([
            'service' => $service->load(['user:id,name,email,avatar_path,status', 'category:id,name']),
        ]);
    }

    // Si cambian campos de contenido, el servicio vuelve a estado PENDING para moderación.
    public function update(Request $request, Service $service)
    {
        if ($request->user()->status === 'BLOCKED') {
            return response()->json([
                'message' => 'Tu cuenta está bloqueada. No puedes editar servicios.',
            ], 403);
        }

        if ((int) $service->user_id !== (int) $request->user()->id) {
            return response()->json(['message' => 'No puedes editar un servicio que no es tuyo.'], 403);
        }

        $data = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'type' => ['required', 'in:OFFER,REQUEST'],
            'title' => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:100'],
            'is_active' => ['required', 'boolean'],
        ]);

        $contentChanged =
            $service->type !== $data['type'] ||
            $service->title !== $data['title'] ||
            $service->description !== ($data['description'] ?? null) ||
            $service->location !== ($data['location'] ?? null) ||
            (int) $service->category_id !== (int) ($data['category_id'] ?? 0);

        $service->fill($data);

        if ($contentChanged) {
            $service->moderation_status = 'PENDING';
            $service->reviewed_by = null;
            $service->reviewed_at = null;
            $service->rejection_reason = null;
        }

        $service->save();

        return response()->json([
            'message' => $contentChanged
                ? 'Servicio actualizado correctamente. Queda pendiente de revisión.'
                : 'Visibilidad del servicio actualizada correctamente.',
            'service' => $service->fresh()->load(['user:id,name,avatar_path,status', 'category:id,name']),
        ]);
    }

    public function destroy(Request $request, Service $service)
    {
        if ((int) $service->user_id !== (int) $request->user()->id) {
            return response()->json(['message' => 'No puedes eliminar un servicio que no es tuyo.'], 403);
        }

        $service->delete();

        return response()->json(null, 204);
    }

    /* Matching de servicios: Devuelve servicios similares o complementarios al servicio dado,
    basándose en tipo, categoría, ubicación y palabras clave. */
    public function matches(Request $request, Service $service)
    {
        if (!$service->is_active || $service->moderation_status !== 'APPROVED') {
            return response()->json([
                'message' => 'Servicio no disponible para matching.',
            ], 404);
        }

        $limit = (int) $request->query('limit', 6);

        $candidates = Service::query()
            ->with(['user:id,name,avatar_path,status', 'category:id,name'])
            ->where('id', '!=', $service->id)
            ->where('user_id', '!=', $service->user_id)
            ->where('is_active', true)
            ->where('moderation_status', 'APPROVED')
            ->limit(80)
            ->get();

        $baseText = strtolower(($service->title ?? '') . ' ' . ($service->description ?? ''));
        $baseWords = collect(preg_split('/\s+/', $baseText))
            ->filter(fn($word) => strlen($word) > 3)
            ->unique()
            ->values();

        $matches = $candidates
            ->map(function ($candidate) use ($service, $baseWords) {
                $score = 0;
                $reasons = [];

                if ($candidate->type !== $service->type) {
                    $score += 35;
                    $reasons[] = 'Tipo complementario';
                }

                if ($candidate->category_id && $candidate->category_id === $service->category_id) {
                    $score += 30;
                    $reasons[] = 'Misma categoría';
                }

                if (
                    $candidate->location &&
                    $service->location &&
                    strtolower($candidate->location) === strtolower($service->location)
                ) {
                    $score += 20;
                    $reasons[] = 'Misma ubicación';
                }

                $candidateText = strtolower(($candidate->title ?? '') . ' ' . ($candidate->description ?? ''));

                $commonWords = $baseWords
                    ->filter(fn($word) => str_contains($candidateText, $word))
                    ->count();

                if ($commonWords > 0) {
                    $keywordScore = min($commonWords * 5, 20);
                    $score += $keywordScore;
                    $reasons[] = 'Coincidencia de palabras clave';
                }

                if ($candidate->created_at && $candidate->created_at->gt(now()->subDays(30))) {
                    $score += 5;
                    $reasons[] = 'Servicio reciente';
                }

                $candidate->match_score = $score;
                $candidate->match_reasons = $reasons;

                return $candidate;
            })
            ->filter(fn($candidate) => $candidate->match_score > 0)
            ->sortByDesc('match_score')
            ->take($limit)
            ->values();

        return response()->json([
            'base_service' => $service->load(['user:id,name,avatar_path,status', 'category:id,name']),
            'matches' => $matches,
        ]);
    }

    /* Recomendaciones personalizadas: Devuelve servicios recomendados para
    el usuario basándose en sus servicios activos, categorías, ubicaciones y tipos. */
    public function recommendations(Request $request)
    {
        $user = $request->user();
        $limit = (int) $request->query('limit', 6);

        $myServices = Service::query()
            ->where('user_id', $user->id)
            ->get();

        $myCategoryIds = $myServices
            ->pluck('category_id')
            ->filter()
            ->unique()
            ->values();

        $myLocations = $myServices
            ->pluck('location')
            ->filter()
            ->map(fn($location) => strtolower(trim($location)))
            ->unique()
            ->values();

        $myTypes = $myServices
            ->pluck('type')
            ->filter()
            ->unique()
            ->values();

        $candidates = Service::query()
            ->with(['user:id,name,avatar_path,status', 'category:id,name'])
            ->where('user_id', '!=', $user->id)
            ->where('is_active', true)
            ->where('moderation_status', 'APPROVED')
            ->limit(100)
            ->get();

        $recommendations = $candidates
            ->map(function ($service) use ($myCategoryIds, $myLocations, $myTypes) {
                $score = 0;
                $reasons = [];

                if ($service->category_id && $myCategoryIds->contains($service->category_id)) {
                    $score += 40;
                    $reasons[] = 'Coincide con una categoría que ya usas';
                }

                if (
                    $service->location &&
                    $myLocations->contains(strtolower(trim($service->location)))
                ) {
                    $score += 20;
                    $reasons[] = 'Cerca de tu zona habitual';
                }

                if ($myTypes->isNotEmpty() && !$myTypes->contains($service->type)) {
                    $score += 25;
                    $reasons[] = 'Tipo complementario a tus publicaciones';
                }

                if ($service->created_at && $service->created_at->gt(now()->subDays(30))) {
                    $score += 10;
                    $reasons[] = 'Servicio publicado recientemente';
                }

                if ($score === 0) {
                    $score = 5;
                    $reasons[] = 'Servicio activo de la comunidad';
                }

                $service->recommendation_score = $score;
                $service->recommendation_reasons = $reasons;

                return $service;
            })
            ->sortByDesc('recommendation_score')
            ->take($limit)
            ->values();

        return response()->json([
            'user_id' => $user->id,
            'based_on' => [
                'categories' => $myCategoryIds,
                'locations' => $myLocations,
                'types' => $myTypes,
            ],
            'recommendations' => $recommendations,
        ]);
    }
}