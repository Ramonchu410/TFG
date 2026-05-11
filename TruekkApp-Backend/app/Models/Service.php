<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'user_id',
        'category_id',
        'type',
        'title',
        'description',
        'location',
        'is_active',
        'moderation_status',
        'reviewed_by',
        'reviewed_at',
        'rejection_reason',
    ];


    // Propietario del servicio publicado en el marketplace.
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Usuarios que guardaron este servicio para revisarlo luego.
    public function savedByUsers()
    {
        return $this->hasMany(SavedService::class);
    }
}
