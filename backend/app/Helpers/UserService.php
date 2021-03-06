<?php 
namespace App\Helpers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class UserService{
    public $name, $email, $password, $deviceName;
    public function __construct($name, $email, $password, $deviceName)
    {
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
        $this->deviceName = $deviceName;
    }
    public function validateInput($auth = false){
        $validationRule = $auth ? 'exists:users': 'unique:users';
        $validator = Validator::make([
            'name'=> $this->name,
            'email'=> $this->email,
            'password'=>$this->password
        ],
        [
            'name'=>['nullable'],
            'email'=>['required', 'email', $validationRule],
            'password'=>['required', 'string']
        ],
       $messages= [
            'exists:users'=>'Cet utilisateur n\'existe pas.',
            'unique:users'=>'Adresse E-mail existe déjà',
       ],
       
        );
        if($validator->fails()){
            return ['status'=>false, 'message'=>$messages];

        }else{
            return ['status'=>true];
        }
    }
    public function register($deviceName){
        $validate = $this->validateInput(false);
        if($validate['status']== false){
            return $validate;
        }else{
            $user = User::create([
                'name'=>$this->name,
                 'email'=>$this->email,
                 'adresse'=>'',
                 'telefon'=>'',
                 'password'=>Hash::make($this->password)
            ]);
            $token = $user->createToken($deviceName)->plainTextToken;
            return ['status'=> true, 'token'=>$token, 'user'=>$user, 'device'=>$deviceName];
        }
    }


    public function login($deviceName){
        $validate = $this->validateInput(true);
        if($validate['status']== false){
            return $validate;
        }
        else{
            $user = User::where('email', $this->email)->first();
            if(Hash::check($this->password, $user->password)){
                $token = $user->createToken($deviceName)->plainTextToken;
                return ['status'=> true, 'token'=>$token, 'user'=>$user, 'device'=>$deviceName];
            }else{
                return ['status'=>false, 'message'=> ['password'=>'Mot de passe incorrect !']];
            }
        }
    }
}