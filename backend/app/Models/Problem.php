<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
class Problem extends Model
{
    use HasFactory;
    protected $fillable = [
        'problemName',
        'description_problem',
        'solution_problem',
        'image_problem'
    ];
    function products(){
        return $this->belongsToMany(Product::class, 'product_problems');
    }
}
