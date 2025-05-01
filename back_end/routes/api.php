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
    
        use App\Http\Controllers\Api\AdminAuthController;
        use App\Http\Controllers\Api\ProfesseurAuthController;







            // Authentification
            Route::post('admin/login', [AdminAuthController::class, 'login']);
            Route::post('professeur/login', [ProfesseurAuthController::class, 'login']);

            // Route publique
            Route::apiResource('home/professeurs', ProfesseurController::class);

            // Routes protégées pour les administrateurs
            Route::middleware(['auth.admin'])->group(function () {
                Route::apiResource('administrateurs', AdministrateurController::class);
                Route::apiResource('departements', DepartementController::class);
                Route::apiResource('grades', GradeController::class);
                Route::apiResource('laboratoires', LaboratoireController::class);
                Route::apiResource('equipes', EquipeController::class);
                Route::apiResource('professeurs', ProfesseurController::class);
                Route::apiResource('publications', PublicationController::class);
            });

            // ✅ Routes protégées pour les professeurs
            Route::middleware(['auth.professeur'])->group(function () {
                // ✅ Ta route personnalisée AVANT les ressources REST
                Route::put('/professeur/update-portfolio', [ProfesseurController::class, 'updatePortfolio']);

                // Routes REST
                Route::apiResource('professeurs', ProfesseurController::class);
                Route::apiResource('grades', GradeController::class);
                Route::apiResource('laboratoires', LaboratoireController::class);
                Route::apiResource('equipes', EquipeController::class);
                Route::apiResource('departements', DepartementController::class);
                Route::apiResource('publications', PublicationController::class);
            });

        
