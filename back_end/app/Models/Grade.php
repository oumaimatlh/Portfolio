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
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Professeur> $professeurs
 * @property-read int|null $professeurs_count
 * @method static \Illuminate\Database\Eloquent\Builder|Grade newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Grade newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Grade query()
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Grade extends Model
{
    use HasFactory;

    protected $fillable = ['nom'];

    // Relation avec les professeurs
    public function professeurs()
    {
        return $this->hasMany(Professeur::class, 'id_grade');
    }
}
