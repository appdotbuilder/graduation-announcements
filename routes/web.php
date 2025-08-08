<?php

use App\Http\Controllers\GraduationController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Main graduation announcements page
Route::get('/', [GraduationController::class, 'index'])->name('home');

// Student search functionality
Route::post('/search', [GraduationController::class, 'store'])->name('graduation.search');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Student management routes (staff only)
    Route::resource('students', StudentController::class);
    Route::get('students-import', [\App\Http\Controllers\StudentImportController::class, 'index'])->name('students.import');
    Route::post('students-import', [\App\Http\Controllers\StudentImportController::class, 'store'])->name('students.import.process');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
