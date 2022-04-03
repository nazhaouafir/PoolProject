<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CommandeMail extends Mailable
{
    use Queueable, SerializesModels;
    
    public $url;
    public $commande;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($commande, $url)
    {
        //
        $this->commande = $commande;
        $this->url = $url;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Nouvelle Commande')->from('info@maroc-piscines.com')
                ->markdown('emails.commandemail');
    }
}
