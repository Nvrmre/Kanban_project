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
        'created_by',
        'updated_by',
    ];

    /**
     * Relasi Board dengan Project
     */
    public function project()
    {
        return $this->belongsTo(Project::class, 'projects_id');
    }
}
