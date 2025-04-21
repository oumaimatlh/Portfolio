<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfessorAuthenticate
{
    public function handle(Request $request, Closure $next)
    {
        // Vérifie si l'utilisateur est authentifié en tant que professeur
        if (Auth::guard('professeur')->check()) {
            return $next($request); // L'utilisateur est un professeur, il peut accéder
        }

        // Si l'utilisateur est authentifié en tant qu'administrateur, autoriser l'accès aussi
        if (Auth::guard('admin')->check()) {
            return $next($request); // L'utilisateur est un administrateur, il peut aussi accéder
        }

        // Si aucun des guards ne correspond, retourner une erreur "Unauthorized"
        return response()->json(['message' => 'Unauthorized', 'error' => 'Professeur'], 401);
    }
}

