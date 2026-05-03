<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SavedService;
use App\Models\Service;
use Illuminate\Http\Request;

class SavedServiceController extends Controller
{
    public function index(Request $request)
    {
        $saved = SavedService::query()
            ->with([
                'service.user:id,name,avatar_path',
                'service.category:id,name',
            ])
            ->where('user_id', $request->user()->id)
            ->whereHas('service', function ($query) {
                $query
                    ->where('is_active', true)
                    ->where('moderation_status', 'APPROVED');
            })
            ->orderByDesc('id')
            ->get()
            ->pluck('service')
            ->values();

        return response()->json($saved);
    }

    public function check(Request $request, Service $service)
    {
        $saved = SavedService::query()
            ->where('user_id', $request->user()->id)
            ->where('service_id', $service->id)
            ->exists();

        return response()->json([
            'saved' => $saved,
        ]);
    }

    public function store(Request $request, Service $service)
    {
        if ((int) $service->user_id === (int) $request->user()->id) {
            return response()->json([
                'message' => 'No puedes guardar tu propio servicio.',
            ], 422);
        }

        if (!$service->is_active || $service->moderation_status !== 'APPROVED') {
            return response()->json([
                'message' => 'No puedes guardar un servicio no disponible.',
            ], 422);
        }

        SavedService::firstOrCreate([
            'user_id' => $request->user()->id,
            'service_id' => $service->id,
        ]);

        return response()->json([
            'message' => 'Servicio guardado correctamente.',
            'saved' => true,
        ]);
    }

    public function destroy(Request $request, Service $service)
    {
        SavedService::query()
            ->where('user_id', $request->user()->id)
            ->where('service_id', $service->id)
            ->delete();

        return response()->json([
            'message' => 'Servicio eliminado de guardados.',
            'saved' => false,
        ]);
    }
}