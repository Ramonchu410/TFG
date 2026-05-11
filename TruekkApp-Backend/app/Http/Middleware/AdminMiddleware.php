<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    // Corta acceso si el usuario autenticado no tiene rol ADMIN.
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || $request->user()->role !== 'ADMIN') {
            return response()->json([
                'message' => 'Acceso denegado. Solo administradores.'
            ], 403);
        }

        return $next($request);
    }
}