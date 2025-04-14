<?php
        namespace App\Models;

        use Illuminate\Database\Eloquent\Factories\HasFactory;
        use Illuminate\Database\Eloquent\Model;
        use Illuminate\Foundation\Auth\User as Authenticatable;
        use Tymon\JWTAuth\Contracts\JWTSubject;

        class Administrateur extends Authenticatable implements JWTSubject
        {
            use HasFactory;

            protected $fillable = ['nom', 'prenom', 'email', 'mot_de_passe', 'actif'];

            protected $casts = [
                'actif' => 'boolean',
            ];
            
            protected $hidden = ['mot_de_passe'];

            // Requis par JWTSubject
            public function getJWTIdentifier()
            {
                return $this->getKey();
            }

            public function getJWTCustomClaims()
            {
                return [];
            }
        }

