<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'task_id',
        'comment',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
        return $this->belongsTo(User::class, 'user_id');
    }
    
    
    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id');
        return $this->belongsTo(Task::class, 'task_id');
    }
    public function comments()
{
    return $this->hasMany(Comment::class);
}
    
    
}
