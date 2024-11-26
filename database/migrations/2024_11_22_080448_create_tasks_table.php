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
        $table->id();
        $table->string('name');
        $table->longText('description')->nullable();
        $table->enum('priority', ['low', 'Medium', 'High']);
        $table->enum('status', ['To Do', 'In Progress', 'Done']);
        $table->foreignId('assigned_id')->constrained('users'); // Ensure 'users.id' matches the data type
        $table->foreignId('board_id')->constrained('boards'); // Ensure 'boards.id' matches the data type
        $table->string('due_date')->nullable();
        $table->timestamps();
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
