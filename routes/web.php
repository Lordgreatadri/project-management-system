<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Projects\ProjectsController;
use App\Http\Controllers\Users\UsersController;
use App\Http\Controllers\Tasks\TasksController;
use Inertia\Inertia;

Route::redirect('/', 'dashboard');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))
        ->name('dashboard');
    Route::resource('projects', ProjectsController::class);  
    Route::resource('tasks', TasksController::class);    
    Route::resource('users', UsersController::class);    
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
