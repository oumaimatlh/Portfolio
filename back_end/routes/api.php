<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdministrateurController;
use App\Http\Controllers\Api\PublicationController;
use App\Http\Controllers\Api\DepartementController;
use App\Http\Controllers\Api\GradeController;
use App\Http\Controllers\Api\LaboratoireController;
use App\Http\Controllers\Api\ProfesseurController;
use App\Http\Controllers\Api\EquipeController;
<<<<<<< HEAD
=======

Route::middleware(['jwt.auth', 'admin.actif'])->group(function () {
    // ...
        Route::apiResource('administrateurs', AdministrateurController::class);
        Route::apiResource('departements', DepartementController::class);
        Route::apiResource('grades', GradeController::class);
        Route::apiResource('laboratoires', LaboratoireController::class);
        Route::apiResource('equipes', EquipeController::class);
        Route::apiResource('professeurs', ProfesseurController::class);
        Route::apiResource('publications', PublicationController::class);   
});








>>>>>>> c93f50c038110c7c36bcdb29cc2f48b4cc4b1e4b
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AuthProfesseurController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// 🔐 Authentification Professeur
Route::post('/login-professeur', [AuthProfesseurController::class, 'login']);

// 🔐 Authentification Admin
Route::post('/admin/login', [AuthController::class, 'login']);


// 🔒 Routes protégées avec un seul middleware JWT
Route::middleware(['jwt.auth'])->group(function () {

    // 👤 Route universelle pour obtenir l'utilisateur connecté
    Route::get('/me', function () {
        return response()->json(auth()->user());
    });

    // 👁️ Identifier le type d'utilisateur connecté (admin ou prof)
    Route::get('/whoami', function () {
        $user = auth()->user();
        $type = class_basename($user);

        return response()->json([
            'type' => $type,
            'user' => $user
        ]);
    });

    // 🧑‍🏫 Routes accessibles uniquement aux professeurs (si tu veux filtrer côté frontend)
    Route::get('/professeur/me', [AuthProfesseurController::class, 'me']);
    Route::get('/protected', fn() => response()->json(['message' => 'Token valide']));

    
    // 🛡️ Routes spécifiques à l’admin actif
    Route::middleware('admin.actif')->group(function () {
        Route::post('/admin/logout', [AuthController::class, 'logout']);

        // 🎓 Ressources admin
        Route::apiResource('administrateurs', AdministrateurController::class);
        Route::apiResource('departements', DepartementController::class);
        Route::apiResource('grades', GradeController::class);
        Route::apiResource('laboratoires', LaboratoireController::class);
        Route::apiResource('equipes', EquipeController::class);
        Route::apiResource('professeurs', ProfesseurController::class);
        Route::apiResource('publications', PublicationController::class);
    });
});
