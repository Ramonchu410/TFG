<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\TradeRequest;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    // POST /api/reviews
    public function store(Request $request)
    {
        $userId = $request->user()->id;

        $data = $request->validate([
            'trade_request_id' => ['required', 'exists:trade_requests,id'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:1000'],
        ]);

        $trade = TradeRequest::with('targetService')->findOrFail($data['trade_request_id']);

        // 🔒 Solo participantes
        $isParticipant =
            (int) $trade->requester_id === (int) $userId ||
            (int) $trade->targetService->user_id === (int) $userId;

        if (!$isParticipant) {
            return response()->json(['message' => 'No autorizado.'], 403);
        }

        // 🔒 Solo si COMPLETED
        if ($trade->status !== 'COMPLETED') {
            return response()->json([
                'message' => 'Solo puedes valorar intercambios completados.'
            ], 422);
        }

        // 🔒 No duplicados
        $exists = Review::where('from_user_id', $userId)
            ->where('trade_request_id', $trade->id)
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Ya has dejado una valoración en este intercambio.'
            ], 422);
        }

        // 🎯 A quién valoro
        $toUserId = (int) $trade->requester_id === (int) $userId
            ? $trade->targetService->user_id
            : $trade->requester_id;

        $review = Review::create([
            'from_user_id' => $userId,
            'to_user_id' => $toUserId,
            'trade_request_id' => $trade->id,
            'rating' => $data['rating'],
            'comment' => $data['comment'] ?? null,
        ]);

        return response()->json([
            'message' => 'Valoración enviada correctamente',
            'review' => $review->load('fromUser:id,name'),
        ], 201);
    }

    // GET /api/users/{user}/reviews
    public function getUserReviews($userId)
    {
        $reviews = Review::with('fromUser:id,name')
            ->where('to_user_id', $userId)
            ->latest()
            ->get();

        return response()->json($reviews);
    }
}