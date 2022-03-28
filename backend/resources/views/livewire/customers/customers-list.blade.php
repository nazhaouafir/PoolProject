<div class="card">
    <div class="header">
        <h4 class="title">Consomateurs</h4>
        {{-- ajouter un problème --}}
        <a href="{{route('add-problem')}}" target="_blank" rel="noopener noreferrer">
            <button      
                   class="btn btn-primary" style="margin-top: 30px; margin-bottom:20px">
                Ajouter un consomateur
            </button>
        </a>        
    </div>
    <div class="content table-responsive ">
        <table class="table table-hover table-striped">
            <thead>
                <tr>
                <th>ID</th>
                <th>Nom et prénom</th>
                <th>E-mail</th>
                <th>Commandes</th>
                
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($customers as $item)
                     <tr>
                    <td>{{$item->id}}</td>
                    <td>
                        <div class="flex">
                            {{-- @if($item->image_client)
                                 <img class="avatar border-gray" src="{{ asset('storage/' . $item->image_problem) }}" alt="..."> 
                            @endif                            --}}
                            {{$item->name}}
                        </div>
                    </td>
                    <td>{{$item->email}}</td>
                    <td>1</td>
                    <td>
                        <div style="display:flex">
                                <button class="btn btn-primary mx-1"><i class="fal fa-eye"></i></button>
                                <a href="{{route('edit-customer',['id'=>$item->id])}}"
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