<?php

return [

    'defaults' => [
        'guard' => 'admin', // ou 'professeur' si tu veux tester ce guard par défaut
        'passwords' => 'users',
    ],

    'guards' => [
        'admin' => [
            'driver' => 'jwt',
            'provider' => 'admins',
        ],

        'professeur' => [
            'driver' => 'jwt',
            'provider' => 'professeurs',
        ],
    ],

    'providers' => [
        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Models\Administrateur::class,
        ],

        'professeurs' => [
            'driver' => 'eloquent',
            'model' => App\Models\Professeur::class,
        ],
    ],

];
