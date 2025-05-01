<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $id
 * @property string $nom
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Laboratoire> $laboratoires
 * @property-read int|null $laboratoires_count
 * @method static \Illuminate\Database\Eloquent\Builder|Departement newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Departement newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Departement query()
 * @method static \Illuminate\Database\Eloquent\Builder|Departement whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Departement whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Departement whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Departement whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Departement extends Model
{
    use HasFactory;

    protected $fillable = ['nom'];

    // Relation avec les laboratoires
    public function laboratoires()
    {
        return $this->hasMany(Laboratoire::class, 'id_departement');
    }
}
