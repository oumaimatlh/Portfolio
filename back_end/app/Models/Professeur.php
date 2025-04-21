<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Professeur extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'code_authentification',
        'mot_de_passe',
        'scopus',
        'orcid',
        'scholar',
        'photo',
        'id_administrateur',
        'id_equipe',
        'id_grade',
    ];

    protected $hidden = ['mot_de_passe'];

    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function setMotDePasseAttribute($value)
    {
        // Évite de re-hasher un mot de passe déjà hashé
        if (!empty($value) && !\Illuminate\Support\Str::startsWith($value, '$2y$')) {
            $this->attributes['mot_de_passe'] = bcrypt($value);
        } else {
            $this->attributes['mot_de_passe'] = $value;
        }
    }

    // ✅ Relations ajoutées :

    public function administrateur()
    {
        return $this->belongsTo(Administrateur::class, 'id_administrateur');
    }

    public function equipe()
    {
        return $this->belongsTo(Equipe::class, 'id_equipe');
    }

    public function grade()
    {
        return $this->belongsTo(Grade::class, 'id_grade');
    }
}
