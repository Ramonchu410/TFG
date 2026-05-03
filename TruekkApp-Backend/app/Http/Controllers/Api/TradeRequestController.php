<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\TradeRequest;
use Illuminate\Http\Request;

class TradeRequestController extends Controller
{
    // GET /api/trade-requests
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $query = TradeRequest::query()
            ->with([
                'requester:id,name,email',
                'targetService:id,title,description,location,user_id,type',
                'targetService.user:id,name,email',
                'offerService:id,title,description,location,user_id,type',
                'offerService.user:id,name,email',
            ])
            ->where(function ($q) use ($userId) {
                $q->where('requester_id', $userId)
                  ->orWhereHas('targetService', fn($sq) => $sq->where('user_id', $userId));
            })
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->when($request->target_service_id, fn($q) => $q->where('target_service_id', $request->target_service_id))
            ->orderByDesc('id');

        return response()->json($query->paginate(10));
    }

    // POST /api/trade-requests
    public function store(Request $request)
    {
        $requesterId = $request->user()->id;

        $data = $request->validate([
            'target_service_id' => ['required', 'exists:services,id'],
            'offer_service_id' => ['required', 'exists:services,id'],
            'message' => ['nullable', 'string', 'max:1000'],
        ]);

        $targetService = Service::findOrFail($data['target_service_id']);

        if ((int) $targetService->user_id === (int) $requesterId) {
            return response()->json([
                'message' => 'No puedes solicitar tu propio servicio.',
            ], 422);
        }

        if (!$targetService->is_active || $targetService->moderation_status !== 'APPROVED') {
            return response()->json([
                'message' => 'No puedes solicitar un servicio que no está disponible.',
            ], 403);
        }

        $offerService = Service::findOrFail($data['offer_service_id']);

        if ((int) $offerService->user_id !== (int) $requesterId) {
            return response()->json([
                'message' => 'El servicio que ofreces debe ser tuyo.',
            ], 422);
        }

        if (!$offerService->is_active || $offerService->moderation_status !== 'APPROVED') {
            return response()->json([
                'message' => 'Tu servicio ofrecido debe estar activo y aprobado.',
            ], 403);
        }

        if ((int) $offerService->id === (int) $targetService->id) {
            return response()->json([
                'message' => 'No puedes ofrecer el mismo servicio que estás solicitando.',
            ], 422);
        }

        $alreadyExists = TradeRequest::where('requester_id', $requesterId)
            ->where('target_service_id', $targetService->id)
            ->whereIn('status', ['PENDING', 'ACCEPTED'])
            ->exists();

        if ($alreadyExists) {
            return response()->json([
                'message' => 'Ya tienes una solicitud activa para este servicio.',
            ], 422);
        }

        $trade = TradeRequest::create([
            'requester_id' => $requesterId,
            'target_service_id' => $targetService->id,
            'offer_service_id' => $offerService->id,
            'message' => $data['message'] ?? null,
            'status' => 'PENDING',
        ]);

        return response()->json([
            'message' => 'Solicitud de trueque enviada correctamente.',
            'trade_request' => $trade->load([
                'requester:id,name,email',
                'targetService:id,title,description,location,user_id,type',
                'targetService.user:id,name,email',
                'offerService:id,title,description,location,user_id,type',
                'offerService.user:id,name,email',
            ]),
        ], 201);
    }

    // GET /api/trade-requests/{tradeRequest}
    public function show(Request $request, TradeRequest $tradeRequest)
    {
        $userId = $request->user()->id;

        $tradeRequest->load('targetService');

        if (
            (int) $tradeRequest->requester_id !== (int) $userId &&
            (int) $tradeRequest->targetService->user_id !== (int) $userId
        ) {
            return response()->json(['message' => 'No autorizado.'], 403);
        }

        return response()->json(
            $tradeRequest->load([
                'requester:id,name,email',
                'targetService:id,title,description,location,user_id,type',
                'targetService.user:id,name,email',
                'offerService:id,title,description,location,user_id,type',
                'offerService.user:id,name,email',
            ])
        );
    }

    // PATCH /api/trade-requests/{tradeRequest}/accept
    public function accept(Request $request, TradeRequest $tradeRequest)
    {
        $tradeRequest->load('targetService');

        if ((int) $tradeRequest->targetService->user_id !== (int) $request->user()->id) {
            return response()->json(['message' => 'No puedes aceptar una solicitud que no va dirigida a ti.'], 403);
        }

        if ($tradeRequest->status !== 'PENDING') {
            return response()->json(['message' => 'Solo se pueden aceptar solicitudes pendientes.'], 422);
        }

        $tradeRequest->update(['status' => 'ACCEPTED']);

        return response()->json($tradeRequest);
    }

    // PATCH /api/trade-requests/{tradeRequest}/reject
    public function reject(Request $request, TradeRequest $tradeRequest)
    {
        $tradeRequest->load('targetService');

        if ((int) $tradeRequest->targetService->user_id !== (int) $request->user()->id) {
            return response()->json(['message' => 'No puedes rechazar una solicitud que no va dirigida a ti.'], 403);
        }

        if ($tradeRequest->status !== 'PENDING') {
            return response()->json(['message' => 'Solo se pueden rechazar solicitudes pendientes.'], 422);
        }

        $tradeRequest->update(['status' => 'REJECTED']);

        return response()->json($tradeRequest);
    }

    // PATCH /api/trade-requests/{tradeRequest}/cancel
    public function cancel(Request $request, TradeRequest $tradeRequest)
    {
        if ((int) $tradeRequest->requester_id !== (int) $request->user()->id) {
            return response()->json(['message' => 'Solo puedes cancelar tus propias solicitudes.'], 403);
        }

        if (!in_array($tradeRequest->status, ['PENDING', 'ACCEPTED'], true)) {
            return response()->json(['message' => 'Solo se pueden cancelar solicitudes pendientes o aceptadas.'], 422);
        }

        $tradeRequest->update(['status' => 'CANCELLED']);

        return response()->json($tradeRequest);
    }

    // PATCH /api/trade-requests/{tradeRequest}/complete
    public function complete(Request $request, TradeRequest $tradeRequest)
    {
        $tradeRequest->load('targetService');

        $userId = $request->user()->id;

        if (
            (int) $tradeRequest->requester_id !== (int) $userId &&
            (int) $tradeRequest->targetService->user_id !== (int) $userId
        ) {
            return response()->json(['message' => 'No autorizado.'], 403);
        }

        if ($tradeRequest->status !== 'ACCEPTED') {
            return response()->json(['message' => 'Solo se pueden completar solicitudes aceptadas.'], 422);
        }

        $tradeRequest->update(['status' => 'COMPLETED']);

        return response()->json($tradeRequest);
    }
}