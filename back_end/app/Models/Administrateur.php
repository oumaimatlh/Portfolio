<?php
        namespace App\Models;

        use Illuminate\Database\Eloquent\Factories\HasFactory;
        use Illuminate\Database\Eloquent\Model;
        use Illuminate\Foundation\Auth\User as Authenticatable;
        use Tymon\JWTAuth\Contracts\JWTSubject;

        /**
 * 
 *
 * @property int $id
 * @property string $nom
 * @property string $prenom
 * @property string $email
 * @property string $mot_de_passe
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property bool $actif
 * @method static \Illuminate\Database\Eloquent\Builder|Administrateur newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Administrateur newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Administrateur query()
 * @method static \Illuminate\Database\Eloquent\Builder|Administrateur whereActif($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrateur whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrateur whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrateur whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrateur whereMotDePasse($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrateur whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrateur wherePrenom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrateur whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Administrateur extends Authenticatable implements JWTSubject
        {
            use HasFactory;

            protected $fillable = ['nom', 'prenom', 'email', 'mot_de_passe', 'actif'];

            protected $casts = [
                'actif' => 'boolean',
            ];
            public function getAuthPassword()
            {
                return $this->mot_de_passe;
            }

            
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

