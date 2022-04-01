<?php

namespace App\Http\Controllers;

use App\Models\commande;
use Illuminate\Http\Request;
use App\Mail\CommandeMail;
use Illuminate\Support\Facades\Mail;
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
        $commande = commande::create([
            'user_id'=>$user->id,
        ]);
        if($commande){
            
                foreach(collect($products) as  $item){
                    $commande->products()
                            ->attach($item['id'],
                                    ['quantity'=>$item['qty'],
                                    'product_name'=>$item['title_product']]);
                    
                 }
                 $url = "https://www.maroc-piscines.com/";
                 Mail::to('ouafirnazha@gmail.com')->send(new CommandeMail($commande, $url));
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
