<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;

class VerifierAdministrateurActif
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            // Tente de récupérer l'utilisateur à partir du token
            $admin = JWTAuth::parseToken()->authenticate();

            if (!$admin) {
                Log::info('Token fourni mais utilisateur non trouvé');
                return response()->json(['error' => 'Authentification requise'], 401);
            }

            if (!$admin->actif) {
                Log::info('Administrateur non actif', ['admin' => $admin]);
                return response()->json(['error' => 'Administrateur inactif'], 403);
            }

            // Tout est bon, continuer
            return $next($request);

        } catch (Exception $e) {
            Log::error('Erreur JWT : ' . $e->getMessage());
            return response()->json(['error' => 'Token invalide ou manquant'], 401);
        }
    }
}
