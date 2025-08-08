<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Student
 *
 * @property int $id
 * @property string $student_id
 * @property string $name
 * @property string $major
 * @property string $graduation_status
 * @property \Illuminate\Support\Carbon|null $graduation_date
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Student newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Student newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Student query()
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereGraduationDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereGraduationStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereMajor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student graduated()
 * @method static \Illuminate\Database\Eloquent\Builder|Student pending()
 * @method static \Database\Factories\StudentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Student extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'student_id',
        'name',
        'major',
        'graduation_status',
        'graduation_date',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'graduation_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include graduated students.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeGraduated($query)
    {
        return $query->where('graduation_status', 'graduated');
    }

    /**
     * Scope a query to only include pending students.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('graduation_status', 'pending');
    }
}