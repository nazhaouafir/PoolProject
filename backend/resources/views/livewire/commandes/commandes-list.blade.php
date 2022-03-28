<div class="card">
    <div class="header">
        <h4 class="title">Commandes</h4>
            
    </div>
    <div class="content table-responsive ">
        <table class="table table-hover table-striped">
            <thead>
                <tr>
                <th>ID</th>
                <th>Consomateur</th>
                <th>Produits</th>
                <th>Adresse</th>
                <th>Téléphone</th>
                <th>Status</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @forelse (collect(["1","2","3"]) as $item)
                     <tr>
                    <td>{{$item}}</td>
                    <td>
                        <div class="flex">
                         test
                        </div>
                    </td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>1</td>
                    <td>
                        <div style="display:flex">
                                <button class="btn btn-primary mx-1"><i class="fal fa-eye"></i></button>
                                <a href="{{route('edit-customer',['id'=>$item])}}"
                                     target="_blank" rel="noopener noreferrer">
                                    <button class="btn btn-info mx-1"><i class="fal fa-edit"></i></button>
                                </a>
                                <button wire:click="delete({{ $item }})" class="btn btn-danger mx-1">
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