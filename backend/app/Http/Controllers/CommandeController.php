<?php

namespace App\Http\Controllers;

use App\Models\commande;
use Illuminate\Http\Request;

class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $products = $request->products;
        $adresse = $request->adresse;
        $full_name = $request->full_name;
        $telefon = $request->telefon;
        $status = $request->status;
        $commande = commande::create([
            'user_id'=>$user->id,
            'full_name'=>$full_name,
            'adresse'=>$adresse,
            'telefon'=>$telefon,
            'status'=>$status
        ]);
        if($commande){
            
                foreach(collect($products) as  $item){
                    $commande->products()
                            ->attach($item['id'],
                                    ['quantity'=>$item['qty'],
                                    'product_name'=>$item['title_product']]);
                    
                 }
                    return response()->json([
                        'success'=> true,
                    ]);
                    
        }else{
            return response()->json(
                ['success'=>false],
                500
            );
        }
      
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
