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
        'full_name',
        'adresse',
        'telefon',
        'status',
    ];
    public function products(){
        return $this->belongsToMany(Product::class, 'commade_products')->withTimestamps()->withPivot('quantity');
    }
    public function client(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
