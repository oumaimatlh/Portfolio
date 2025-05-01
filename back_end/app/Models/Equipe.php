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
 * @property int $id_laboratoire
 * @property-read \App\Models\Laboratoire|null $laboratoire
 * @method static \Illuminate\Database\Eloquent\Builder|Equipe newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Equipe newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Equipe query()
 * @method static \Illuminate\Database\Eloquent\Builder|Equipe whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Equipe whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Equipe whereIdLaboratoire($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Equipe whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Equipe whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Equipe extends Model
{
    use HasFactory;
    protected $fillable = ['nom', 'id_laboratoire'];


    // Relation avec les laboratoires
    public function laboratoire()
    {
        return $this->belongsTo(Laboratoire::class, 'id_laboratoire');
    }
}
