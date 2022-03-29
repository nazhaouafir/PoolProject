<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class commadeProduct extends Model
{
    use HasFactory;
    protected $fillable=[
        'product_id', 
        'commande_id',
        'quantity',
        'product_name'

    ];
}
