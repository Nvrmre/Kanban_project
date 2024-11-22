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
            $table->enum('status',['To Do','In Progress','Done']);
            $table->foreignId('assigned_id')->constrained('users.id');
            $table->foreignId('board_id')->constrained('boards.id');
            $table->string('due_date')->nullable();
            $table->timestamp('created_at');
            $table->timestamps('updated_at');
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
