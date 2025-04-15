<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Professeur;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthProfesseurController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'code_authentification' => 'required|string',
            'mot_de_passe' => 'required|string',
        ]);

        $prof = Professeur::where('code_authentification', $request->code_authentification)->first();

        if (!$prof || !Hash::check($request->mot_de_passe, $prof->mot_de_passe)) {
            return response()->json(['error' => 'Identifiants invalides'], 401);
        }

        // Authentification manuelle
        $token = JWTAuth::fromUser($prof);

        return response()->json([
            'token' => $token,
            'professeur' => $prof
        ]);
    }

    public function me()
    {
        try {
            $prof = JWTAuth::parseToken()->authenticate();
            return response()->json($prof);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token invalide'], 401);
        }
    }

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['message' => 'Déconnexion réussie']);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Erreur lors de la déconnexion'], 500);
        }
    }
}
