<div class="card">
    <div class="header">
        <h4 class="title">Ajouter un produit</h4>
    </div>
    <div class="content">
        <form>
            <div style="padding-left: 30px; padding-right:30px">
               <div class="row">
                <div class="col-md-10">
                    <div class="form-group">
                        <label>Categorie</label>
                        <select wire:model="category_id" class="form-control" placeholder="">
                            <option value=""></option>
                            @forelse ($categories as $item)
                                <option value="{{$item->id}}">{{$item->categoryName}}</option>
                            @empty
                                
                            @endforelse
                            
                           
                        </select>
                       
                    </div>
                </div>
                <div class="col-md-2"> 
                    <button
                    wire:click.prevent="toggleCategory"
                     @if ($add_category)
                         disabled
                     @endif class="btn btn-primary" style="margin: 24px;">
                        <i class="fal fa-plus"></i>
                    </button>
                </div>
            </div>
            @if ($add_category)
                  <div class="row">
                <div class="col-md-10">
                    <div class="form-group">
                        <label>Nouveau Categorie</label>
                        <input wire:model="new_category" type="text" class="form-control" placeholder="">
                    </div>
                @error('new_category')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
                </div>
                <div class="col-md-2"> 
                    <button 
                    wire:click.prevent="save_category"
                    class="btn btn-success" style="margin: 24px;">
                        <i class="fal fa-check"></i>
                    </button>
                </div>
            </div>   
            @endif
       
               <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Titre du produit</label>
                        <input wire:model="title_product" type="text" class="form-control" placeholder="">
                    </div>
                    @error('title_product')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Description du produit</label>
                        <textarea wire:model="description_product" rows="10" cols="15" class="form-control" placeholder="description du produit">
                        </textarea>
                        @error('description_product')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Marque</label>
                        <input wire:model="marque"  class="form-control"  />
                    </div>
                    @error('marque')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Emballage</label>
                        <input wire:model="poid"  class="form-control"  />
                    </div>
                    @error('poid')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Prix</label>
                        <input wire:model="price" class="form-control"  />
                    </div>
                    @error('price')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div  >
                        <img style="width: 100px" src="{{ asset('storage/' . $product->image_product) }}" alt="..."> 
                    </div>
                    <div class="form-group">
                        <label>Image descriptive</label>
                        <input wire:model="image_product" type="file" class="form-control" name="" id="">
                    </div>
                    @error('image_product')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                    @enderror
                </div>
            </div>
            </div>            
            <button type="submit" wire:click.prevent='editProduct' style="margin-left: 450px;" class="btn btn-info btn-fill pull-right">
                Enregistrer les modifications
            </button>
            <div class="clearfix"></div>
        </form>
    </div>
</div>
