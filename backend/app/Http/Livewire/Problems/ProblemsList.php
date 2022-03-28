<?php

namespace App\Http\Livewire\Problems;

use App\Models\Problem;
use Livewire\Component;
use Jantinnerezo\LivewireAlert\LivewireAlert;

class ProblemsList extends Component
{
    protected $listeners =[
        'confirmed'=>'confirme_delete'
    ];
    use LivewireAlert;
    public $problems;
    public $problem_delete;
    public function mount(){
        $this->problems = Problem::all();
        // dd($this->problems);
    }
    
    public function delete($id){
       $this->problem_delete = $id;
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
    public function confirme_delete(){
    $problem = Problem::with('products')->find($this->problem_delete);
            // dd($problem);
    if($problem->products){
                $problem->products()->detach();
            }        
        $problem->delete();
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
        return view('livewire.problems.problems-list');
    }
}
