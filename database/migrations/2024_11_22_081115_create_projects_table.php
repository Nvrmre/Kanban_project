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
        Schema::create('projects', function (Blueprint $table) {
            $table->id(); // Auto increment primary key
            $table->string('name'); // Nama board
            $table->longText('description')->nullable(); // Deskripsi board
            $table->foreignId('created_by')->constrained('users'); // Menambahkan foreign key ke tabel users
            $table->foreignId('updated_by')->constrained('users');
            $table->timestamps(); // Menambahkan kolom created_at dan updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
