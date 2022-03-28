<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\User;
class commande extends Model
{
    use HasFactory; 
    protected $fillable = [
        'user_id',
        'status',
    ];
    public function products(){
        return $this->belongsToMany(Product::class, 'commade_products');
    }
    public function client(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
