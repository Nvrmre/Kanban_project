<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

// Rute dengan Middleware
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'projects' => \App\Models\Project::all(),
            'tasks' => \App\Models\Task::all(),
        ]);
    })->name('dashboard');

    // Resource Controllers
    Route::resource('project', ProjectController::class);
    Route::resource('task', TaskController::class);
    Route::resource('board', BoardController::class);
});

// Rute Testing
Route::get('/users/test', [UserController::class, 'test'])->name('users.test');

// Rute Kanban
Route::get('/kanban', function () {
    return Inertia::render('Kanban/Index');
})->name('kanban.index');

// Rute Setting
Route::get('/setting', function () {
    return Inertia::render('Setting/Index');
})->name('setting.index');

// Rute Laporan
Route::get('/laporan', function () {
    return Inertia::render('Laporan/Index');
})->name('laporan.index');

// Rute Users
Route::get('/users', [UserController::class, 'index'])->name('users.index');

// Profile Management
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rute Project Show
Route::get('/project/{project}', function ($project) {
    return Inertia::render('Project/Show', [
        'project' => \App\Models\Project::with('boards.tasks')->findOrFail($project),
    ]);
})->name('project.show');


require __DIR__.'/auth.php';
