<?php

use App\Http\Controllers\DiagramController;
use App\Http\Controllers\ProfileController;
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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('diagrams')->group(function () {
        Route::get('/', [DiagramController::class, 'index'])->name('diagrams.index');
        Route::get('/create', [DiagramController::class, 'create'])->name('diagrams.create');
        Route::post('/', [DiagramController::class, 'store'])->name('diagrams.store');
        Route::get('/{diagram}', [DiagramController::class, 'show'])->name('diagrams.show');
        Route::put('/{diagram}', [DiagramController::class, 'update'])->name('diagrams.update');
        Route::delete('/{diagram}', [DiagramController::class, 'destroy'])->name('diagrams.destroy');
    });
});

require __DIR__.'/auth.php';
