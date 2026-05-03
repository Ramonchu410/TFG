<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\Service;
use Illuminate\Http\Request;

class AdminServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Service::query()
            ->with(['user:id,name,email', 'category:id,name'])
            ->when($request->moderation_status, fn($q) => $q->where('moderation_status', $request->moderation_status))
            ->when($request->type, fn($q) => $q->where('type', $request->type))
            ->when($request->category_id, fn($q) => $q->where('category_id', $request->category_id))
            ->when($request->location, fn($q) => $q->where('location', 'like', '%' . $request->location . '%'))
            ->orderByDesc('id');

        return response()->json($query->get());
    }

    public function pending()
    {
        $services = Service::query()
            ->where('moderation_status', 'PENDING')
            ->with(['user:id,name,email', 'category:id,name'])
            ->orderByDesc('id')
            ->get();

        return response()->json($services);
    }

    public function show(Service $service)
    {
        return response()->json(
            $service->load(['user:id,name,email', 'category:id,name'])
        );
    }

    public function approve(Request $request, Service $service)
    {
        $service->update([
            'moderation_status' => 'APPROVED',
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
            'rejection_reason' => null,
        ]);

        Notification::create([
            'user_id' => $service->user_id,
            'type' => 'SERVICE_APPROVED',
            'title' => 'Servicio aprobado',
            'message' => "Tu servicio \"{$service->title}\" ha sido aprobado y ya aparece en el marketplace.",
        ]);

        return response()->json([
            'message' => 'Servicio aprobado correctamente',
            'service' => $service->fresh()->load(['user:id,name,email', 'category:id,name']),
        ]);
    }

    public function reject(Request $request, Service $service)
    {
        $data = $request->validate([
            'rejection_reason' => ['required', 'string', 'max:1000'],
        ]);

        $service->update([
            'moderation_status' => 'REJECTED',
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
            'rejection_reason' => $data['rejection_reason'],
        ]);

        Notification::create([
            'user_id' => $service->user_id,
            'type' => 'SERVICE_REJECTED',
            'title' => 'Servicio rechazado',
            'message' => "Tu servicio \"{$service->title}\" ha sido rechazado. Motivo: {$data['rejection_reason']}",
        ]);

        return response()->json([
            'message' => 'Servicio rechazado correctamente',
            'service' => $service->fresh()->load(['user:id,name,email', 'category:id,name']),
        ]);
    }

    public function destroy(Service $service)
    {
        $serviceTitle = $service->title;
        $serviceOwnerId = $service->user_id;

        Notification::create([
            'user_id' => $serviceOwnerId,
            'type' => 'SERVICE_DELETED',
            'title' => 'Servicio eliminado por moderación',
            'message' => "Tu servicio \"{$serviceTitle}\" ha sido eliminado por moderación y ya no está disponible en TruekApp.",
        ]);

        $service->delete();

        return response()->json([
            'message' => 'Servicio eliminado correctamente',
        ]);
    }
}