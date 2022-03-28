<?php

namespace App\Http\Livewire\Products;

use App\Models\Product;
use Jantinnerezo\LivewireAlert\LivewireAlert;
use Livewire\Component;

class ProductsList extends Component
{
    use LivewireAlert;
    protected $listeners = [
        'confirmed'=>'confirmDelete'
    ];

    public $products;
    public $product_delete;
    public function mount(){
        $this->products =Product::all();
    }

    public function deleteProduct($id){
         $this->product_delete = $id;
         $this->alert('warning', 'Suppression', [
             'position' => 'center',
             'timer' => '',
             'toast' => true,
             'text' => 'Êtes-vous sûr de vouloir supprimer?',
             'showConfirmButton' => true,
             'onConfirmed' => 'confirmed',
             'confirmButtonText' => 'Oui',
             'showCancelButton' => true,
             'onDismissed' => '',
             'cancelButtonText' => 'Non',
            ]);   
         }
    
    public function confirmDelete(){
        $product = Product::with('problems')->find($this->product_delete);
        if($product->problems){
            $product->problems()->detach();
        }
        $product->delete();
        $this->mount();
        $this->alert('success', 'la suppression a été effectué', [
            'position' => 'center',
            'timer' => 3000,
            'toast' => true,
            'text' => '',
            'showDenyButton' => false,
            'onDenied' => '',
        ]);
    }
    public function render()
    {
        return view('livewire.products.products-list');
    }
}
