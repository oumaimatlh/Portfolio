<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Professeur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProfesseurAuthController extends Controller
{
    
    public function login(Request $request)
    {
        $credentials = $request->only('code_authentification', 'mot_de_passe');
        
        $professeur = Professeur::where('code_authentification', $credentials['code_authentification'])->first();
        if (!$professeur) {
            return response()->json(['error' => 'Professeur non trouvé'], 404);
        }
        
        if (!$professeur || !Hash::check($credentials['mot_de_passe'], $professeur->mot_de_passe)) {
            return response()->json(['error' => 'code_authentification ou mot de passe invalide'], 401);
        }
    
        $token = Auth::guard('professeur')->login($professeur);
    
        return $this->respondWithToken($token, 'professeur');
    }

    protected function respondWithToken($token, $guard)
    {
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'guard' => $guard,
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => Auth::guard($guard)->user()
        ]);
    }
}
