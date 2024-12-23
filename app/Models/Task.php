<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'priority',
        'status',
        'assigned_id',
        'board_id',
        'due_date',
        'notification_duration', // Tambahkan ini
    ];

    /**
     * Mutator untuk due_date agar selalu tersimpan dengan format yang benar.
     */
    public function setDueDateAttribute($value)
    {
        $this->attributes['due_date'] = \Carbon\Carbon::parse($value)->format('Y-m-d');
    }

    /**
     * Accessor untuk created_at dengan format tertentu.
     */
    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('Y-m-d');
    }

    /**
     * Accessor untuk due_date dengan format tertentu.
     */
    public function getDueDateAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('Y-m-d');
    }
    public function board()
    {
        return $this->belongsTo(Board::class);
    }

    
    public function comments()
{
    return $this->hasMany(Comment::class, 'tasks_id');
}


}
