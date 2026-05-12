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

    public function verify(User $user)
{
    $user->update([
        'status' => 'VERIFIED',
    ]);

    \App\Models\Notification::create([
        'user_id' => $user->id,
        'type' => 'INFO',
        'title' => 'Cuenta verificada',
        'message' => 'Tu cuenta ha sido verificada correctamente. Ya apareces como usuario verificado en TruekApp.',
    ]);

    return response()->json([
        'message' => 'Usuario verificado correctamente',
        'user' => $user->fresh(),
    ]);
}

public function block(User $user)
{
    $user->update([
        'status' => 'BLOCKED',
    ]);

    \App\Models\Notification::create([
        'user_id' => $user->id,
        'type' => 'INFO',
        'title' => 'Cuenta bloqueada',
        'message' => 'Tu cuenta ha sido bloqueada por administración. Puedes seguir viendo servicios, pero no puedes publicar ni solicitar trueques.',
    ]);

    return response()->json([
        'message' => 'Usuario bloqueado correctamente',
        'user' => $user->fresh(),
    ]);
}
}
