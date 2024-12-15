<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Repository\UtilisateurRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/utilisateur', name: 'api_utilisateur_')]
class UtilisateurController
{
    private $entityManager;
    private $passwordHasher;
    private $serializer;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        SerializerInterface $serializer
    ) {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
        $this->serializer = $serializer;
    }

    #[Route('/', methods: ['GET'], name: 'list')]
    public function list(UtilisateurRepository $repository): JsonResponse
    {
        $utilisateurs = $repository->findAll();
        $data = $this->serializer->normalize($utilisateurs, null, ['groups' => 'utilisateur']);
        return new JsonResponse(['status' => 'success', 'data' => $data], 200);
    }

    #[Route('/{id}', methods: ['GET'], name: 'show')]
    public function show(Utilisateur $utilisateur): JsonResponse
    {
        $data = $this->serializer->normalize($utilisateur, null, ['groups' => 'utilisateur']);
        return new JsonResponse(['status' => 'success', 'data' => $data], 200);
    }

    #[Route('/', methods: ['POST'], name: 'create')]
    public function create(Request $request, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $utilisateur = new Utilisateur();
        $utilisateur->setNom($data['nom']);
        $utilisateur->setPrenom($data['prenom']);
        $utilisateur->setEmail($data['email']);
        $utilisateur->setMotDePasse($this->passwordHasher->hashPassword($utilisateur, $data['motDePasse']));
        $utilisateur->setIsAdmin($data['isAdmin']);
        $utilisateur->setLocalisation($data['localisation'] ?? null);

        // Validation des données
        $errors = $validator->validate($utilisateur);
        if (count($errors) > 0) {
            return new JsonResponse(['status' => 'error', 'errors' => (string)$errors], 400);
        }

        $this->entityManager->persist($utilisateur);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'success', 'message' => 'Utilisateur créé', 'id' => $utilisateur->getId()], 201);
    }

    #[Route('/{id}', methods: ['PUT'], name: 'update')]
    public function update(Request $request, Utilisateur $utilisateur, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $utilisateur->setNom($data['nom'] ?? $utilisateur->getNom());
        $utilisateur->setPrenom($data['prenom'] ?? $utilisateur->getPrenom());
        $utilisateur->setEmail($data['email'] ?? $utilisateur->getEmail());
        if (isset($data['motDePasse'])) {
            $utilisateur->setMotDePasse($this->passwordHasher->hashPassword($utilisateur, $data['motDePasse']));
        }
        $utilisateur->setIsAdmin($data['isAdmin'] ?? $utilisateur->getIsAdmin());
        $utilisateur->setLocalisation($data['localisation'] ?? $utilisateur->getLocalisation());

        // Validation des données
        $errors = $validator->validate($utilisateur);
        if (count($errors) > 0) {
            return new JsonResponse(['status' => 'error', 'errors' => (string)$errors], 400);
        }

        $this->entityManager->flush();

        return new JsonResponse(['status' => 'success', 'message' => 'Utilisateur mis à jour'], 200);
    }

    #[Route('/{id}', methods: ['DELETE'], name: 'delete')]
    public function delete(Utilisateur $utilisateur): JsonResponse
    {
        $this->entityManager->remove($utilisateur);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'success', 'message' => 'Utilisateur supprimé'], 200);
    }
}
