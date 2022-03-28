<?php

namespace App\Http\Livewire\Problems;

use App\Models\Problem;
use App\Models\Product;
use Livewire\Component;
use Livewire\WithFileUploads;

class AddProblem extends Component
{    
    use WithFileUploads;

    public $problemName,
           $description_problem,
           $solution_problem,
           $image_problem,
           $product_id=[];
    public $problem;
    public $orderproducts = [];
    public $i = 0;

    public $products;
    public function mount(){
        
        $this->products = Product::all();

    }
    public function addProduct($i){
        $i = $i+1;
        array_push($this->orderproducts, $i);
        // dd(count($this->orderproducts));
    }

    public function removeProduct($index){
        unset($this->orderproducts[$index]);
        unset($this->product_id[$index]);
                    }
public function reset_form(){
    $this->problemName='';
    $this->description_problem='';
    $this->solution_problem='';
    $this->image_problem= null;
    $this->product_id= [];
}
    public function save_problem(){
        $this->validate([
            'problemName'=>'required',
            'description_problem'=>'required',
            'solution_problem'=>'required'
        ]);
        $problem = Problem::create([
            'problemName'=>$this->problemName,
            'description_problem'=>$this->description_problem,
            'solution_problem'=>$this->solution_problem,
            'image_problem'=>$this->image_problem ? $this->image_problem->store('problems','public') : null,
        ]);
        if($this->product_id){
            foreach($this->product_id as $key => $value){
            // dump($value);
            $problem->products()->attach($value);
        }
        
        }
        $this->reset_form();

        return redirect()->to('/problems');

    }
    public function render()
    {
        return view('livewire.problems.add-problem');
    }
}
