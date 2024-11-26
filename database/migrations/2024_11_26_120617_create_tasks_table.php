<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('name'); // Nama board
            $table->longText('description')->nullable(); // Deskripsi board
            $table->enum('priority', ['low', 'medium', 'high']); // Prioritas (gunakan huruf kecil untuk konsistensi)
            $table->enum('status', ['to_do', 'in_progress', 'done']); // Status (gunakan snake_case untuk konsistensi)
            $table->foreignId('assigned_id')->constrained('users')->onDelete('cascade'); // Foreign key ke tabel users
            $table->foreignId('board_id')->constrained('projects')->onDelete('cascade'); // Foreign key ke tabel boards
            $table->date('due_date')->nullable(); // Tipe data due_date diperbaiki menjadi date
            $table->timestamps(); // Kolom created_at dan updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
