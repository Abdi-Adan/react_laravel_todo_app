<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodoItem extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $fillable = [
        'title',
        'completed'
    ];

    protected $appends = [
        'user_id',
    ];
    
    public function getUserAttribute()
    {
        return $this->user->name;
    }
}