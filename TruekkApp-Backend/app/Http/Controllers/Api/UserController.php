<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(
            User::select('id', 'name', 'email', 'avatar_path')->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return response()->json($user, 201);
    }

    public function show(User $user)
    {
        $services = Service::query()
            ->with(['category:id,name'])
            ->where('user_id', $user->id)
            ->where('is_active', true)
            ->where('moderation_status', 'APPROVED')
            ->orderByDesc('id')
            ->get();

        $reviews = Review::query()
            ->with(['fromUser:id,name,avatar_path'])
            ->where('to_user_id', $user->id)
            ->orderByDesc('id')
            ->get();

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'role' => $user->role,
                'avatar_url' => $user->avatar_url,
                'created_at' => $user->created_at,
            ],
            'stats' => [
                'services_count' => $services->count(),
                'reviews_count' => $reviews->count(),
                'average_rating' => round($reviews->avg('rating') ?? 0, 1),
            ],
            'services' => $services,
            'reviews' => $reviews,
        ]);
    }

    public function updateAvatar(Request $request)
    {
        $data = $request->validate([
            'avatar' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        $user = $request->user();

        if ($user->avatar_path) {
            Storage::disk('public')->delete($user->avatar_path);
        }

        $path = $data['avatar']->store('avatars', 'public');

        $user->update([
            'avatar_path' => $path,
        ]);

        return response()->json([
            'message' => 'Foto de perfil actualizada correctamente.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'avatar_url' => $user->fresh()->avatar_url,
            ],
        ]);
    }
}