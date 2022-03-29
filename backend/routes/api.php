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
    $user_info = User::with(['infos'])->find($user->id);
    return response()->json([
        'user'=>$user_info
    ]); 

});
Route::middleware('auth:sanctum')->post('/commande', [CommandeController::class, 'store']);

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
// Route::post('logout',[AuthController::class,'logout']);
Route::middleware('auth:sanctum')->post('logout',[AuthController::class,'logout']);
