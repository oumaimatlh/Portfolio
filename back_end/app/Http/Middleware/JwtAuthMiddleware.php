<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

class JwtAuthMiddleware
{
    /**
     * Gère une requête entrante.
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            // Vérifie et authentifie le token JWT
            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                return response()->json(['error' => 'Utilisateur non trouvé'], 404);
            }

        } catch (TokenExpiredException $e) {
            return response()->json(['error' => 'Token expiré'], 401);

        } catch (TokenInvalidException $e) {
            return response()->json(['error' => 'Token invalide'], 401);

        } catch (JWTException $e) {
            return response()->json(['error' => 'Token non fourni'], 401);
        }

        return $next($request);
    }
}
