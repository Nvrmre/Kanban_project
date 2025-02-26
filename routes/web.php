<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // Jika user sudah login, arahkan ke dashboard
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    // Jika user belum login, tampilkan halaman landing
    return Inertia::render('Welcome');
})->name('Welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [ProjectController::class, 'index'])
        ->name('dashboard');
});

Route::put('/project/{project}', [ProjectController::class, 'update'])->middleware('auth');


Route::resource('project', ProjectController::class);
Route::put('/tasks/{task}/{boardId}', [TaskController::class, 'update_board'])->name('task.updateBoard');

// For adding a comment to a specific task
// Menambahkan route khusus untuk menambah komentar pada task tertentu
Route::post('/task/{task}/comment', [CommentController::class, 'store'])->name('task.comment.store');


Route::resource('comment', CommentController::class);


Route::resource('task', TaskController::class);
Route::resource('boards', BoardController::class);


Route::get('/kanban/{projectId?}', [BoardController::class, 'index'])->name('kanban.index');

// Rute Testing
Route::get('/users/test', [UserController::class, 'test'])->name('users.test');




// Rute Setting
Route::get('/setting', function () {
    return Inertia::render('Setting/Index');
})->name('setting.index');
Route::resource('setting', SettingController::class);
// Rute Laporan
Route::get('/laporan', [TaskController::class, 'report'])->name('laporan.index');

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
        'project' => \App\Models\Project::with('boards.tasks')->findOrFail($project),
    ]);
})->name('project.show');
Route::post('/tasks/{taskId}/comments', [CommentController::class, 'store'])->name('comments.store');



require __DIR__ . '/auth.php';
