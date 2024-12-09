<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function(){
    Route::get('/dashboard', [ProjectController::class, 'index'])
    ->name('dashboard');

    Route::delete('/project/{id}', [ProjectController::class, 'destroy'])->name('project.destroy');
    Route::resource('project', ProjectController::class);

    Route::resource('task', TaskController::class);
    Route::resource('board', BoardController::class);
   Route::get('/kanban', function () {
        return Inertia::render('Kanban/Index');
    })->name('kanban.index');


    Route::get('/kanban/{id}', function ($id) {
        return Inertia::render('Kanban/Index', ['id' => $id]);
    })->name('kanban.show');
});

Route::get('/users/test', [UserController::class, 'show'])->name('users.test');


Route::get('/setting', function () {
    return Inertia::render('Setting/Index');
})->name('setting.index');

Route::get('/laporan', function () {
    return Inertia::render('Laporan/Index');
})->name('laporan.index');

Route::get('/users', function () {
    $users = app(UserController::class)->index();
    $totalUsers = $users->count();

    return Inertia::render('User/Index', [
        'users' => $users,
        'totalUsers' => $totalUsers
    ]);
})->name('users.index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::middleware('auth')->group(function () {
//     Route::get('/setting', [ProfileController::class, 'edit'])->name('setting.edit');
//     Route::patch('/setting', [ProfileController::class, 'update'])->name('setting.update');
//     Route::delete('/setting', [ProfileController::class, 'destroy'])->name('setting.destroy');
// });

require __DIR__.'/auth.php';
