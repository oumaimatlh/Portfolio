<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'mot_de_passe');
    
        // Rename mot_de_passe to password for the attempt()
        $credentials['password'] = $credentials['mot_de_passe'];
        unset($credentials['mot_de_passe']);
    
        if (!$token = Auth::guard('admin')->attempt($credentials)) {
            return response()->json(['error' => 'Email ou mot de passe invalide'], 401);
        }
    
        return $this->respondWithToken($token, 'admin');
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
