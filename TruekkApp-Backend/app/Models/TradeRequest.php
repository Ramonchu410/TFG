<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TradeRequest extends Model
{
    protected $fillable = [
        'requester_id',
        'target_service_id',
        'offer_service_id',
        'status',
        'message',
    ];

    public function requester()
    {
        return $this->belongsTo(User::class, 'requester_id');
    }

    public function targetService()
    {
        return $this->belongsTo(Service::class, 'target_service_id');
    }

    public function offerService()
    {
        return $this->belongsTo(Service::class, 'offer_service_id');
    }

    public function messages()
    {
        return $this->hasMany(TradeMessage::class);
    }
}