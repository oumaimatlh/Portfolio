<?php

return [
    'defaults' => [
        'guard' => 'api', // Par défaut, on utilise le guard JWT pour les administrateurs
        'passwords' => 'administrateurs',
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],
        'api' => [ // Guard JWT pour les administrateurs
            'driver' => 'jwt',
            'provider' => 'administrateurs',

        ],
    ],
    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        'administrateurs' => [
            'driver' => 'eloquent',
            'model' => App\Models\Administrateur::class,
        ],
    ],

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],

        'administrateurs' => [
            'provider' => 'administrateurs',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,

];
