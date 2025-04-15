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

// 🔒 Routes protégées avec middleware JWT
Route::middleware(['jwt.auth'])->group(function () {

    // 👤 Obtenir l'utilisateur connecté
    Route::get('/me', function () {
        return response()->json(auth()->user());
    });

    // 👁️ Identifier le type d'utilisateur connecté
    Route::get('/whoami', function () {
        $user = auth()->user();
        $type = class_basename($user);

        return response()->json([
            'type' => $type,
            'user' => $user
        ]);
    });

    // 🧑‍🏫 Routes pour les professeurs
    Route::get('/professeur/me', [AuthProfesseurController::class, 'me']);
    Route::get('/protected', fn() => response()->json(['message' => 'Token valide']));

    // 🛡️ Routes spécifiques à l’admin actif
    Route::middleware('admin.actif')->group(function () {
        Route::post('/admin/logout', [AuthController::class, 'logout']);

        Route::apiResource('administrateurs', AdministrateurController::class);
        Route::apiResource('departements', DepartementController::class);
        Route::apiResource('grades', GradeController::class);
        Route::apiResource('laboratoires', LaboratoireController::class);
        Route::apiResource('equipes', EquipeController::class);
        Route::apiResource('professeurs', ProfesseurController::class);
        Route::apiResource('publications', PublicationController::class);
    });
});
