<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('products', function (Blueprint $table) {
            
            $table->id();
            $table->unsignedBigInteger('category_id'); 
            $table->foreign('category_id')->references('id')->on('categories');
            $table->string('title_product')->nullable();
            $table->longText('description_product')->nullable();
            $table->string('marque')->nullable();
            $table->string('poid')->nullable();
            $table->double('price')->nullable();
            $table->string('image_product')->nullable();            
            $table->timestamps();

        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
