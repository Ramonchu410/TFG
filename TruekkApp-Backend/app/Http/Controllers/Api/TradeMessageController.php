<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TradeRequest;
use App\Models\TradeMessage;
use Illuminate\Http\Request;

class TradeMessageController extends Controller
{
    public function index(Request $request, TradeRequest $tradeRequest)
    {
        $this->authorizeTradeChat($request, $tradeRequest);

        if ($tradeRequest->status !== 'ACCEPTED') {
            return response()->json([
                'message' => 'El chat solo está disponible cuando el trueque ha sido aceptado.',
            ], 403);
        }

        $messages = TradeMessage::query()
            ->with('sender:id,name,email')
            ->where('trade_request_id', $tradeRequest->id)
            ->orderBy('id')
            ->get();

        return response()->json($messages);
    }

    public function store(Request $request, TradeRequest $tradeRequest)
    {
        $this->authorizeTradeChat($request, $tradeRequest);

        if ($tradeRequest->status !== 'ACCEPTED') {
            return response()->json([
                'message' => 'Solo puedes enviar mensajes en trueques aceptados.',
            ], 403);
        }

        $data = $request->validate([
            'message' => ['required', 'string', 'max:2000'],
        ]);

        $message = TradeMessage::create([
            'trade_request_id' => $tradeRequest->id,
            'sender_id' => $request->user()->id,
            'message' => $data['message'],
        ]);

        return response()->json([
            'message' => 'Mensaje enviado correctamente.',
            'trade_message' => $message->load('sender:id,name,email'),
        ], 201);
    }

    private function authorizeTradeChat(Request $request, TradeRequest $tradeRequest): void
    {
        $tradeRequest->loadMissing('targetService');

        $userId = (int) $request->user()->id;

        $isRequester = (int) $tradeRequest->requester_id === $userId;
        $isTargetOwner = (int) $tradeRequest->targetService->user_id === $userId;

        abort_unless($isRequester || $isTargetOwner, 403, 'No autorizado.');
    }
}