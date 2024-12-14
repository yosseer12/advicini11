<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ContactController extends AbstractController
{
    #[Route('/contact/submit', name: 'contact_submit', methods: ['POST'])]
    public function submit(Request $request): JsonResponse
    {
        $name = $request->request->get('name', '');
        $email = $request->request->get('email', '');
        $message = $request->request->get('message', '');

        // Validate and sanitize inputs
        $name = htmlspecialchars(strip_tags($name));
        $email = htmlspecialchars(strip_tags($email));
        $message = htmlspecialchars(strip_tags($message));

        // Save to a file (or handle it differently, like saving to a database)
        $file = 'messages.txt';
        $current = file_get_contents($file);
        $current .= "Name: $name\nEmail: $email\nMessage: $message\n---\n";
        file_put_contents($file, $current);

        return new JsonResponse(['status' => 'success', 'message' => 'Message saved successfully!']);
    }
}
