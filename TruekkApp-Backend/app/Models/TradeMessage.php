<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TradeMessage extends Model
{
    protected $fillable = [
        'trade_request_id',
        'sender_id',
        'message',
    ];

    public function tradeRequest()
    {
        return $this->belongsTo(TradeRequest::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}