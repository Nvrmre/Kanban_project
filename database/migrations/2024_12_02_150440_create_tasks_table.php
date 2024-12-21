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
            $table->enum('priority', ['low', 'medium', 'high']); // Prioritas
            $table->enum('status', ['to_do', 'in_progress', 'done']); // Status
            $table->foreignId('assigned_id')->constrained('users')->onDelete('cascade'); // Foreign key ke tabel users
            $table->foreignId('board_id')->constrained('boards'); // Foreign key ke tabel boards
            $table->date('due_date')->nullable(); // Tanggal batas waktu
            $table->enum('notification_duration', [
                '6 hours', '12 hours', '1 day', '3 days', '5 days', '7 days'
            ])->nullable(); // Kolom untuk durasi notifikasi
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
