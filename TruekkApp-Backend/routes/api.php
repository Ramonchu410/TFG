<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AdminServiceController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TradeMessageController;
use App\Http\Controllers\Api\TradeRequestController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SavedServiceController;


Route::get('/ping', fn() => response()->json(['status' => 'ok']));
Route::get('/categories', [CategoryController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{service}', [ServiceController::class, 'show']);

Route::get('/users/{user}', [UserController::class, 'show']);

// Todo lo que cuelga aquí requiere sesión válida con Sanctum.
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/saved-services', [SavedServiceController::class, 'index']);
    Route::get('/services/{service}/saved', [SavedServiceController::class, 'check']);
    Route::post('/services/{service}/save', [SavedServiceController::class, 'store']);
    Route::delete('/services/{service}/save', [SavedServiceController::class, 'destroy']);

    Route::post('/me/avatar', [UserController::class, 'updateAvatar']);

    Route::get('/recommendations', [ServiceController::class, 'recommendations']);

    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::get('/users/{user}/reviews', [ReviewController::class, 'getUserReviews']);

    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/user', fn(Request $request) => $request->user());
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/services/{service}/matches', [ServiceController::class, 'matches']);
    Route::get('/services/{service}', [ServiceController::class, 'show']);
    Route::get('/my-services', [ServiceController::class, 'myServices']);
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{service}', [ServiceController::class, 'update']);
    Route::delete('/services/{service}', [ServiceController::class, 'destroy']);

    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::patch('/notifications/{notification}/read', [NotificationController::class, 'markAsRead']);
    Route::patch('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);

    Route::get('/trade-requests', [TradeRequestController::class, 'index']);
    Route::post('/trade-requests', [TradeRequestController::class, 'store']);
    Route::get('/trade-requests/{tradeRequest}', [TradeRequestController::class, 'show']);
    Route::patch('/trade-requests/{tradeRequest}/accept', [TradeRequestController::class, 'accept']);
    Route::patch('/trade-requests/{tradeRequest}/reject', [TradeRequestController::class, 'reject']);
    Route::patch('/trade-requests/{tradeRequest}/cancel', [TradeRequestController::class, 'cancel']);
    Route::patch('/trade-requests/{tradeRequest}/complete', [TradeRequestController::class, 'complete']);

    Route::get('/trade-requests/{tradeRequest}/messages', [TradeMessageController::class, 'index']);
    Route::post('/trade-requests/{tradeRequest}/messages', [TradeMessageController::class, 'store']);

        // Rutas de moderación y gestión exclusivas para administradores.
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/services', [AdminServiceController::class, 'index']);
        Route::get('/services/pending', [AdminServiceController::class, 'pending']);
        Route::get('/services/{service}', [AdminServiceController::class, 'show']);
        Route::patch('/services/{service}/approve', [AdminServiceController::class, 'approve']);
        Route::patch('/services/{service}/reject', [AdminServiceController::class, 'reject']);
        Route::delete('/services/{service}', [AdminServiceController::class, 'destroy']);

        Route::get('/users', [AdminController::class, 'index']);
        Route::post('/users', [AdminController::class, 'storeUser']);
        Route::patch('/users/{user}/verify', [AdminController::class, 'verify']);
        Route::patch('/users/{user}/block', [AdminController::class, 'block']);
    });
});