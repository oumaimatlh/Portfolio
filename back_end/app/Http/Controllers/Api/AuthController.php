<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Administrateur; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'mot_de_passe');

        // on renomme les credentials pour correspondre aux colonnes
        $admin = Administrateur::where('email', $credentials['email'])->first();

        if (!$admin || !Hash::check($credentials['mot_de_passe'], $admin->mot_de_passe)) {
            return response()->json(['error' => 'Email ou mot de passe incorrect'], 401);
        }

        $token = JWTAuth::fromUser($admin);

        return response()->json([
            'token' => $token,
            'admin' => $admin
        ]);
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Déconnexion réussie']);
    }

    public function me()
    {
        return response()->json(JWTAuth::parseToken()->authenticate());
    }
}
