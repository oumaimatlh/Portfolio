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
        'id_laboratoire',
        'id_departement',
        'is_completed',
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

    public function laboratoire()
    {
        return $this->belongsTo(Laboratoire::class, 'id_laboratoire');
    }

    public function departement()
    {
        return $this->belongsTo(Departement::class, 'id_departement');
    }
}
