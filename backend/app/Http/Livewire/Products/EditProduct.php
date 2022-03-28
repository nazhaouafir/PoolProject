<?php

namespace App\Http\Livewire\Products;

use App\Models\categorie;
use App\Models\Product;
use Jantinnerezo\LivewireAlert\LivewireAlert;
use Livewire\Component;
use Livewire\WithFileUploads;

class EditProduct extends Component
{
    use LivewireAlert;
    use WithFileUploads;
    public $product;
    public $categories = [];
    public $new_category;
    public $add_category=false;

    public $category_id,
            $title_product,
            $description_product,
            $marque,
            $poid, 
            $price,
            $image_product;

    public function mount(Product $id){
        $this->categories = categorie::all();
            $this->product = $id;
            $this->category_id= $this->product->category_id;
            $this->title_product =$this->product->title_product;
            $this->description_product = $this->product->description_product;
            $this->marque =$this->product->marque;
            $this->poid =$this->product->poid; 
            $this->price =$this->product->price;
            // $this->image_product = $this->product->image_product;
    }
    public function toggleCategory(){
        $this->add_category= true;
    }
    public function save_category(){
        
        $this->validate([
            'new_category'=>'required'
        ]);

        $category = categorie::create([
            'categoryName'=>$this->new_category
        ]);

        if($category){
            $this->categories = categorie::all();
            $this->add_category=false; 
            $this->category_id = $category->id;
             $this->alert('success', 'la categorie a été ajoutée', [
                'position' => 'center',
                'timer' => 3000,
                'toast' => true,
                'text' => '',
                'showDenyButton' => false,
                'onDenied' => '',
            ]);  
               
        }
    }
    public function editProduct(){
        $this->validate([
            'title_product'=>'required',
            'category_id'=>'nullable',
            'description_product'=>'required',
            'poid'=>'nullable',
            'image_product'=>'nullable',
            'marque'=>'nullable',
            'price'=>'nullable',
        ]);
       if($this->product->update([
            'title_product'=>$this->title_product,
            'category_id'=>$this->category_id,
            'description_product'=>$this->description_product,
            'poid'=>$this->poid,
            'marque'=>$this->marque,
            'price'=>$this->price,
            'image_product'=>$this->image_product ? $this->image_product->store('products','public') : $this->product->image_product,
        ])){
            $this->alert('success', 'Les changements sont éffectuées', [
                'position' => 'center',
                'timer' => 3000,
                'toast' => true,
                'text' => '',
                'showDenyButton' => false,
                'onDenied' => '',
                ]);
        }
    }
    public function render()
    { 
        return view('livewire.products.edit-product');
    }
}
