<?php

namespace App\EventListener;

use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

final class AuthenticationSuccessListener
{
    #[AsEventListener(event: 'lexik_jwt_authentication.on_authentication_success')]
    public function onLexikJwtAuthenticationOnAuthenticationSuccess($event): void
    {
        $data = $event->getData();
        $user = $event->getUser();
        $data['user'] = [
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'firstname' => $user->getFirstname(),
            'roles' => $user->getRoles()
        ];

        $event->setData($data);
    }
}
