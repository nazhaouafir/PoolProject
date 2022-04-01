<?php

namespace App\Http\Controllers;

use App\Models\commande;
use Illuminate\Http\Request;
use App\Mail\CommandeMail;
use Illuminate\Support\Facades\Mail;
class MailController extends Controller
{
    //
    public function sendMail(){
        $commande = commande::find(30);
        $url = "https://www.maroc-piscines.com/";
        Mail::to('ouafirnazha@gmail.com')->send(new CommandeMail($commande, $url));
    }
}
