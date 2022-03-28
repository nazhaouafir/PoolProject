    <div class="card">
        <div class="header">
            <h4 class="title">Ajouter un problème</h4>
        </div>
        <div class="content">
            <form>
                <div style="padding-left: 30px; padding-right:30px">
                   <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Titre du problème</label>
                            <input wire:model="problemName" type="text" class="form-control" placeholder="problème">
                        </div>
                        @error('problemName')
                                <div class="text-danger">
                                    {{$message}}
                                </div>
                     @enderror
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Description du problème</label>
                            <textarea wire:model="description_problem" rows="10" cols="15" class="form-control" placeholder="Here can be your description">
                            </textarea>
                            @error('description_problem')
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
                            <label>Solution du problème</label>
                            <textarea wire:model="solution_problem" rows="10" cols="15" class="form-control" placeholder="Here can be your description">
                            </textarea>
                        </div>
                        @error('solution_problem')
                        <div class="text-danger">
                            {{$message}}
                        </div>
                    @enderror
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Image descriptive</label>
                            <input wire:model="image_problem" type="file" class="form-control" name="" id="">
                        </div>
                        @error('image_problem')
                            <div class="text-danger">
                                {{$message}}
                            </div>
                        @enderror
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        {{collect($orderproducts)->count()}}
                        @foreach ($orderproducts as $index => $product)
                        {{$index}}
                              <div style="display: flex" class="form-group">
                            <label>Liste des produits</label>
                            @isset($product_id[$index])
                                {{$product_id[$index]}}
                            @endisset
                            
                            <select wire:model="product_id.{{$index}}" class="form-control">
                                <option value="">Choisir le produit</option>
                                @forelse (collect($products) as $item)
                                    <option value="{{$item->id}}">{{$item->title_product}}</option>
                                @empty
                                    <option value="">Aucun</option>
                                @endforelse
                            </select>
                            <button wire:click.prevent="removeProduct({{$index}})" class="btn btn-danger">
                                <i class="fal fa-trash">
                                </i>
                            </button>
                        </div>
                        @endforeach

                        <button wire:click.prevent="addProduct({{$i+1}})" class="btn btn-default btn-dark">
                            Ajouter un autre produit
                        </button>
                    </div>
                </div>
                </div>            
                <button wire:click.prevent='save_problem' type="submit" style="margin-left: 450px;" class="btn btn-info btn-fill pull-right">
                    Enregistrer
                </button>
                <div class="clearfix"></div>
            </form>
        </div>
    </div>
