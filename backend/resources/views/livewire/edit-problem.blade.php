<div class="card">
    <div class="header">
        <h4 class="title">Mofifier un problème</h4>
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
                    <div class="card-image">
                        <img  src="{{ asset('storage/' . $problem->image_problem) }}" alt="..."> 
                    </div>
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
           
            </div>            
            <button wire:click.prevent='edit' type="submit" style="margin-left: 450px;" class="btn btn-info btn-fill pull-right">
                Enregistrer les modifications
            </button>
            <div class="clearfix"></div>
        </form>
    </div>
</div>
