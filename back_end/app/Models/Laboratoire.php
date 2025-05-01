<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $id
 * @property string $nom
 * @property int $id_departement
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Departement|null $departement
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Equipe> $equipes
 * @property-read int|null $equipes_count
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratoire newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratoire newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratoire query()
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratoire whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratoire whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratoire whereIdDepartement($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratoire whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratoire whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Laboratoire extends Model
{
    use HasFactory;
    protected $fillable = ['nom', 'id_departement'];


    // Relation avec les départements
    public function departement()
    {
        return $this->belongsTo(Departement::class, 'id_departement');
    }

    // Relation avec les équipes
    public function equipes()
    {
        return $this->hasMany(Equipe::class, 'id_laboratoire');
    }
}
