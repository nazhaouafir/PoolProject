@component('mail::message')
# Nouvelle Commande

Informations de client 

@component('mail::table')
<table>
    <thead>
        <th>Nom & Prénom</th>
        <th>Adresse email</th>
        <th>Adresse  </th>
        <th>Téléphone  </th>
    </thead>
    <tbody>
        <tr>
            <td>{{$commande->client->full_name}}  </td>
            <td>{{$commande->client->email}}  </td>
            <td>{{$commande->client->adresse}}</td>
            <td>{{$commande->client->telefon}}</td>
        </tr>
    </tbody>
</table>

@endcomponent
# Détails de la commande

@component('mail::table')
| Produit                           | Quantité            |
| ----------------------------------|:-------------------:|
@foreach ($commande->products as $item)
| {{$item->pivot->product_name}}           | {{$item->pivot->quantity}} |
@endforeach

@endcomponent

{{-- @component('mail::button', ['url' => $url])
SIte
@endcomponent --}}

Cordialement,<br>
{{ config('app.name') }}
@endcomponent
