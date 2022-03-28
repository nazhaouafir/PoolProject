<div class="card">
    <div class="header">
        <h4 class="title">Problèmes</h4>
        {{-- ajouter un problème --}}
        <a href="{{route('add-problem')}}" target="_blank" rel="noopener noreferrer">
            <button      
                   class="btn btn-primary" style="margin-top: 30px; margin-bottom:20px">
                Ajouter un problème
            </button>
        </a>        
    </div>
    <div class="content table-responsive ">
        <table class="table table-hover table-striped">
            <thead>
                <tr>
                <th>ID</th>
                <th>Titre de problème</th>
                <th>Description</th>
                <th>Solutions</th>
                <th>Produits</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($problems as $item)
                     <tr>
                    <td>{{$item->id}}</td>
                    <td>
                        <div class="flex">
                            @if ( $item->image_problem)
                                 <img class="avatar border-gray" src="{{ asset('storage/' . $item->image_problem) }}" alt="..."> 
                            @endif                           
                            {{$item->problemName}}
                        </div>
                    </td>
                    <td>{{$item->description_problem}}</td>
                    <td>{{$item->solution_problem}}</td>
                    <td>
                        <div>
                             <ol>
                                @forelse (collect($item->products) as $index)
                                    <li>{{$index->title_product}}</li>
                                @empty
                                    Aucun produit
                                @endforelse
                            </ol>
                        </div>
                    </td>
                    <td>

                        <div style="display:flex">
                                <button class="btn btn-primary mx-1"><i class="fal fa-eye"></i></button>
                                <a href="{{route('edit-problem',['id'=>$item->id])}}"
                                     target="_blank" rel="noopener noreferrer">
                                    <button class="btn btn-info mx-1"><i class="fal fa-edit"></i></button>
                                </a>
                                <button wire:click="delete({{ $item->id }})" class="btn btn-danger mx-1">
                                    <i class="fal fa-trash"></i>
                                </button>
                        </div>
                        
                    </td>
                </tr>
                @empty
                    
                @endforelse
               
            </tbody>
        </table>

    </div>
</div>
@livewire('livewire-ui-modal')