<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'projects_id',
    ];

    /**
     * Relasi Board dengan Project
     */
    public function project()
    {
        return $this->belongsTo(Project::class, 'projects_id'); // Menyebutkan project_id sebagai foreign key
    }
    

    // Relasi board dengan tugas
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
