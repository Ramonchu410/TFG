<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SavedService extends Model
{
    protected $fillable = [
        'user_id',
        'service_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Servicio marcado como favorito/guardado por el usuario.
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}