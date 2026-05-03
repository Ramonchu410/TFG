<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'from_user_id',
        'to_user_id',
        'trade_request_id',
        'rating',
        'comment',
    ];

    public function fromUser()
    {
        return $this->belongsTo(User::class, 'from_user_id');
    }

    public function toUser()
    {
        return $this->belongsTo(User::class, 'to_user_id');
    }

    public function tradeRequest()
    {
        return $this->belongsTo(TradeRequest::class);
    }
}