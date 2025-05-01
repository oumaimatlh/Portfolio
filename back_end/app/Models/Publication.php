<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $id
 * @property string $titre
 * @property string $contenu
 * @property string $date_publication
 * @property int $professeur_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Professeur|null $professeur
 * @method static \Illuminate\Database\Eloquent\Builder|Publication newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Publication newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Publication query()
 * @method static \Illuminate\Database\Eloquent\Builder|Publication whereContenu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Publication whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Publication whereDatePublication($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Publication whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Publication whereProfesseurId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Publication whereTitre($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Publication whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Publication extends Model
{
    use HasFactory;
    protected $fillable = [
        'titre', 'contenu', 'date_publication', 'professeur_id'
    ];

    // Relation avec les professeurs
    public function professeur()
    {
        return $this->belongsTo(Professeur::class, 'professeur_id');
    }
}
