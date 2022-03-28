<?php

namespace App\Http\Livewire\Products;

use App\Models\categorie;
use App\Models\Problem;
use App\Models\Product;
use Jantinnerezo\LivewireAlert\LivewireAlert;
use Livewire\Component;
use Livewire\WithFileUploads;

class AddProduct extends Component
{ 
     use WithFileUploads;
     use LivewireAlert; 
    public $title_product,
           $description_product,
           $marque,
           $poid,
           $image_product,
           $price,
           $category_id,
           $problem_id=[];
    public $problem;
    public $new_category;
    public $add_category=false;
    public $orderproblems = [];
    public $categories = [];
    public $i = 0;
    public $problems;
    public function mount(){
        
        $this->products = Problem::all();
        $this->categories = categorie::all();

    }
    public function toggleCategory(){
        $this->add_category= true;
    }
    public function addProblem($i){
        $i = $i+1;
        array_push($this->orderproblems, $i);
        // dd(count($this->orderproblems));
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
    public function removeProblem($index){
        unset($this->orderproblems[$index]);
        unset($this->problem_id[$index]);
                    }
    public function reset_form(){
        $this->category_id='';
        $this->title_product='';
        $this->description_product='';
        $this->poid='';
        $this->image_product= null;
        $this->problem_id= [];
        $this->marque = '';
    }
    public function save_product(){
        $this->validate([
            'title_product'=>'required',
            'category_id'=>'nullable',
            'description_product'=>'required',
            'poid'=>'nullable',
            'image_product'=>'nullable',
            'marque'=>'nullable',
            'price'=>'nullable',
        ]);
        $product = Product::create([
            'title_product'=>$this->title_product,
            'category_id'=>$this->category_id,
            'description_product'=>$this->description_product,
            'poid'=>$this->poid,
            'marque'=>$this->marque,
            'price'=>$this->price,
            'image_product'=>$this->image_product ? $this->image_product->store('products','public') : null,
        ]);
        if($this->problem_id && $product){

            foreach($this->problem_id as $key => $value){
                    
                    $product->problems()->attach($value);

                            }
                    }
        $this->reset_form();

        return redirect()->to('/products');

    }
    public function render()
    {
        return view('livewire.products.add-product');
    }
}
