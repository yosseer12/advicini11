<?php namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class RegistrationController extends AbstractController
{
    #[Route('/api/SignUp', name: 'api_signup', methods: ['POST'])]
    public function signUp(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (empty($data['email']) || empty($data['password']) || empty($data['name']) || empty($data['firstName']) || empty($data['address'])) {
            return new JsonResponse(['error' => 'Tous les champs sont requis.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Vérifiez si l'email est déjà utilisé
        $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            return new JsonResponse(['error' => 'L\'email est déjà utilisé.'], JsonResponse::HTTP_CONFLICT);
        }

        // Créer un nouvel utilisateur
        $user = new User();
        $user->setEmail($data['email']);
        $user->setName($data['name']);
        $user->setFirstName($data['firstName']);
        $user->setAddress($data['address']);
        $user->setRoles(['ROLE_USER']); // Attribuer un rôle par défaut

        // Hacher le mot de passe
        $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);

        try {
            $entityManager->persist($user);
            $entityManager->flush();

            return new JsonResponse(['message' => 'Utilisateur créé avec succès.'], JsonResponse::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Échec de l\'enregistrement de l\'utilisateur.'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
