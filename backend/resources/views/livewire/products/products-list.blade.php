<div class="card">
    <div class="header">
        <h4 class="title">Produits</h4>

        <a href="{{route('add-product')}}" target="_blank" rel="noopener noreferrer">
            <button      
            class="btn btn-primary" style="margin-top: 30px; margin-bottom:20px">
                Ajouter un produit
            </button>
        </a>
    </div>
    <div class="content table-responsive ">
        <table class="table table-hover table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Titre du produits</th>
                    <th>Description</th>
                    <th>Marque</th>
                    <th>Emballage</th>
                    <th>Prix</th>
                    
                    <th>Action</th>
                </tr>
        </thead>
            <tbody>
                @forelse (collect($products) as $item)
                  <tr>

                      <td>
                          {{$item->id}}</td>
                    <td>
                        <div>
                            <img class="avatar avatar-md me-3 border-radius-lg" src="{{ asset('storage/' . $item->image_product) }}" alt="" width="">
                            <span>{{$item->title_product}}</span>
                        </div>
                        </td>

                    <td>{{$item->description_product}}</td>

                    <td>{{$item->marque}}</td>
                    <td>{{$item->poid}}</td>
                    <td>{{$item->price}}</td>
        

                    <td>
                        <div style="display:flex">
                                <button class="btn btn-primary mx-1"><i class="fal fa-eye"></i></button>
                                <a href="{{route('edit-product',['id'=>$item->id])}}" target="_blank" rel="noopener noreferrer">
                                    <button class="btn btn-info mx-1"><i class="fal fa-edit"></i></button> 
                                </a>
                                <button
                                wire:click.prevent="deleteProduct({{$item->id}})"
                                class="btn btn-danger mx-1"><i class="fal fa-trash"></i></button>
                        </div>
                    </td>

                </tr>  
                @empty
                    Aucun Produit trouvé
                @endforelse
                
            </tbody>
        </table>

    </div>
</div>