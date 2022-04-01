<?php

use App\Http\Controllers\MailController;
use App\Http\Livewire\Commandes\CommandesList;
use App\Http\Livewire\Customers\CustomersList;
use App\Http\Livewire\Customers\EditCustomer;
use App\Http\Livewire\EditProblem;
use App\Http\Livewire\Problems\AddProblem;
use App\Http\Livewire\Problems\ProblemsList;
use App\Http\Livewire\Products\AddProduct;
use App\Http\Livewire\Products\EditProduct;
use App\Http\Livewire\Products\ProductsList;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('problems', ProblemsList::class)->name('problems');
Route::get('products', ProductsList::class)->name('products');
Route::get('customers', CustomersList::class)->name('customers');
Route::get('commandes', CommandesList::class)->name('commandes');
Route::get('edit-problem/{id}', EditProblem::class)->name('edit-problem');
Route::get('edit-product/{id}', EditProduct::class)->name('edit-product');
Route::get('edit-customer/{id}', EditCustomer::class)->name('edit-customer');
Route::get('add-problem', AddProblem::class)->name('add-problem');
Route::get('add-product', AddProduct::class)->name('add-product');
Route::get('/mail-send',[MailController::class, 'sendMail']);