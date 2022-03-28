<?php

namespace App\Http\Controllers;

use App\Models\UserInfo;
use Illuminate\Http\Request;

class UserInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $infos = UserInfo::all();
        return response()->json([
            'infos'=>$infos
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user_id = $request->user_id;
        $full_name = $request->full_name;
        $telefon = $request->telefon;
        $email = $request->email;
        $city = $request->city;
        $adresse = $request->adresse;

        $infos = UserInfo::create([
           'user_id'=>$user_id,
            'full_name'=>$full_name,
            'telefon'=>$telefon,
            'email'=>$email,
            'city'=>$city,
            'adresse'=>$adresse
        ]);
        if($infos){
            return response()->json([
                'success'=>true,
                'infos'=>$infos
            ]);
        }else{
            return response()->json([
                'success'=>false,
                'infos'=>[]
            ]); 
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
