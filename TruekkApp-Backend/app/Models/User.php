<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Review;
//use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
        'avatar_path',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = [
        'avatar_url',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getAvatarUrlAttribute()
{
    if (!$this->avatar_path) {
        return null;
    }

    return asset('storage/' . $this->avatar_path);
}

    // Relación base: un usuario puede publicar múltiples servicios.
    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function appNotifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function savedServices()
    {
        return $this->hasMany(SavedService::class);
    }

    // Valoraciones recibidas tras cerrar trueques.
    public function reviewsReceived()
    {
        return $this->hasMany(Review::class, 'to_user_id');
    }
}