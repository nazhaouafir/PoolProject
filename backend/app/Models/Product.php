<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Problem;
use App\Models\categorie;
use App\Models\commadeProduct;
use App\Models\commande;
class Product extends Model
{
    use HasFactory;
    protected $fillable=[
        'category_id',
        'title_product',
        'description_product',
        'marque',
        'poid', 
        'price',
        'image_product'
    ];
    function problems(){
        return $this->belongsToMany(Problem::class, 'product_problems');
    }
    function commandes(){
        return $this->belongsToMany(commande::class, 'commade_products');
    }
    function category(){
        return $this->belongsTo(categorie::class, 'category_id');
    }

}
