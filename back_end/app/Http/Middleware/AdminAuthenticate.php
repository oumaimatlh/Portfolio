<?php
// app/Http/Middleware/AdminAuthenticate.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthenticate
{
    public function handle(Request $request, Closure $next)
    {
        // Vérifie si l'utilisateur est authentifié en tant qu'administrateur
        if (Auth::guard('admin')->check()) {
            return $next($request); // L'utilisateur est un administrateur, il peut accéder
        }

        return response()->json(['message' => 'Unauthorized', 'error' => 'Admin'], 401);
    }
}

