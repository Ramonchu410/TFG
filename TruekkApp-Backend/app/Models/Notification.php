<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'title',
        'message',
        'read_at',
    ];

    protected $casts = [
        'read_at' => 'datetime',
    ];

    // Notificación dirigida a un usuario concreto de la plataforma.
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}