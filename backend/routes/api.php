<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\ProblemController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserInfoController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::apiResource('problem', ProblemController::class);
Route::apiResource('product', ProductController::class);
Route::apiResource('/commande', CommandeController::class);
Route::apiResource('infos', UserInfoController::class);
// Route::middleware('auth:sanctum')->apiResource('category', CategoryController::class);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();
    return response()->json([
        'user'=>$user
    ]); 
});
Route::middleware('auth:sanctum')->post('/edituser', function (Request $request) {
    
    $user = $request->user();
    $username = $request->username;
    $email = $request->email;
    $adresse = $request->adresse;
    $telefon = $request->telefon;
    $validator = Validator::make([
        'name'=>$username,
        'email'=>$email,
        'adresse'=>$adresse,
        'telefon'=>$telefon,
    ],
    [
        'name'=>['required'],
        'adresse'=>['required'],
        'telefon'=>['required'],
        'email'=>['required', 'email',Rule::unique('users')->ignore($user->id),],
    ]
    );
    if($validator->fails()){
        return response()->json(['status'=>false, 'message'=>$validator->errors()]);

    }else{
         $user->update([
        'name'=>$username,
        'email'=>$email,
        'adresse'=>$adresse,
        'telefon'=>$telefon
        ]);
        return response()->json(['status'=>true, 'user'=>$user]);
    }

    

     

});
Route::middleware('auth:sanctum')->post('/commande', [CommandeController::class, 'store']);

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
// Route::post('logout',[AuthController::class,'logout']);
Route::middleware('auth:sanctum')->post('logout',[AuthController::class,'logout']);
