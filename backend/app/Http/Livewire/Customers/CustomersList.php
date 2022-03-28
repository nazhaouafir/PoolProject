<?php

namespace App\Http\Livewire\Customers;

use App\Models\User;
use Livewire\Component;

class CustomersList extends Component
{
    public $customers =[];
    public function mount(){
        $this->customers = User::all();
    }
    public function render()
    {
        return view('livewire.customers.customers-list');
    }
}
