<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;

class JwtMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                return response()->json(['error' => 'Utilisateur non trouvé'], 401);
            }

            // L'utilisateur est authentifié, on continue
            return $next($request);

        } catch (JWTException $e) {
            return response()->json(['error' => 'Token invalide ou expiré'], 401);
        } catch (Exception $e) {
            return response()->json(['error' => 'Token requis'], 401);
        }
    }
}
