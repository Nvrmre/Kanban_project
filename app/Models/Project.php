<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    // Kolom yang bisa diisi
    protected $fillable = ['name', 'description', 'status', 'due_date', 'created_by', 'updated_by'];

    /**
     * Relasi dengan user yang membuat proyek
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Relasi dengan user yang memperbarui proyek
     */
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
