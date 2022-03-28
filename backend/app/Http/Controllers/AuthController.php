<?php

namespace App\Http\Controllers;

use App\Helpers\UserService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){
        $response = (new UserService($request->name, $request->email, $request->password, $request->deviceName))->register($request->deviceName);
        return response()->json($response);
    }
    
    public function login(Request $request){
            $response = (new UserService('',$request->email, $request->password, $request->deviceName))->login($request->deviceName);
            return response()->json($response);
    }
    public  function logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json([
            'status'=>200,
            'message'=>'loggedout'
        ]);
    }
    public function edit(Request $request){
        
        $username = $request->username;
        $email = $request->email;
        $user_id = $request->user_id;
        $user = User::find($user_id);

        $user->update([
            'name'=>$username,
            'email'=>$email
        ]);

    }
     

}
