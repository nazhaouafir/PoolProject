<?php

namespace App\Http\Livewire;

use App\Models\Problem;
use Jantinnerezo\LivewireAlert\LivewireAlert;
use Livewire\Component;
use Livewire\WithFileUploads;

class EditProblem extends Component
{
    use WithFileUploads;
    use LivewireAlert;
    public $problemName,
            $description_problem,
            $solution_problem,
            $image_problem;
    public $problem;

    public function mount(Problem $id){

        $this->problem = $id;

        $this->problemName = $this->problem->problemName;
        $this->description_problem = $this->problem->description_problem;
        $this->solution_problem = $this->problem->solution_problem;

    }
    public function edit(){

        if($this->problem->update([

            'problemName'=>$this->problemName,
            'description_problem'=>$this->description_problem,
            'solution_problem'=>$this->solution_problem,
            'image_problem'=>$this->image_problem ? $this->image_problem->store('problems','public') : $this->image_problem,

        ]))
        {
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
        return view('livewire.edit-problem');
    }
}
