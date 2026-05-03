<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // GET /api/admin/users
    public function index()
    {
        $users = User::query()
            ->select('id', 'name', 'email', 'role', 'status', 'created_at')
            ->orderByDesc('id')
            ->get();

        return response()->json($users);
    }

    // POST /api/admin/users
    public function storeUser(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'role' => ['required', 'in:ADMIN,USER'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => $data['role'],
            'status' => 'VERIFIED',
        ]);

        return response()->json([
            'message' => 'Usuario creado por admin',
            'user' => $user,
        ], 201);
    }

    // PATCH /api/admin/users/{user}/verify
    public function verify(User $user)
    {
        $user->update([
            'status' => 'VERIFIED',
        ]);

        return response()->json([
            'message' => 'Usuario verificado correctamente',
            'user' => $user,
        ]);
    }

    // PATCH /api/admin/users/{user}/block
    public function block(User $user)
    {
        $user->update([
            'status' => 'BLOCKED',
        ]);

        return response()->json([
            'message' => 'Usuario bloqueado correctamente',
            'user' => $user,
        ]);
    }
}