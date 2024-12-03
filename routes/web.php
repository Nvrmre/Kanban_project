<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/users/test', [UserController::class, 'show'])->name('users.test');

Route::get('/kanban', function () {
    return Inertia::render('Kanban/Index'); 
})->name('kanban.index');

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
