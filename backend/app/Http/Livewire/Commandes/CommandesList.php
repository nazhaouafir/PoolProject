<?php

namespace App\Http\Livewire\Commandes;

use Livewire\Component;

class CommandesList extends Component
{
    public $commandes = [];
    public function mount(){

    }
    public function render()
    {
        return view('livewire.commandes.commandes-list');
    }
}
