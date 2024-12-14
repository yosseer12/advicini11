<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class MessageController
{
    #[Route('/messages', name: 'save_message', methods: ['POST'])]
    public function saveMessage(Request $request): JsonResponse
    {
        $name = htmlspecialchars(strip_tags($request->request->get('name', '')));
        $email = htmlspecialchars(strip_tags($request->request->get('email', '')));
        $message = htmlspecialchars(strip_tags($request->request->get('message', '')));

        // Validate fields (can also use Symfony forms for better abstraction)
        if (empty($name) || empty($email) || empty($message)) {
            return new JsonResponse(['status' => 'error', 'message' => 'All fields are required.'], 400);
        }

        // Save to a file (or database in a real scenario)
        $file = 'messages.txt';
        file_put_contents($file, "Name: $name\nEmail: $email\nMessage: $message\n---\n", FILE_APPEND);

        return new JsonResponse(['status' => 'success', 'message' => 'Message saved successfully!']);
    }
}
