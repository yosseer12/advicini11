<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Repository\CategorieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/categorie', name: 'api_categorie_')]
class CategorieController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/', methods: ['GET'], name: 'list')]
    public function list(CategorieRepository $repository): JsonResponse
    {
        $categories = $repository->findAll();
        return new JsonResponse($categories, 200);
    }

    #[Route('/{id}', methods: ['GET'], name: 'show')]
    public function show(Categorie $categorie): JsonResponse
    {
        if (!$categorie) {
            return new JsonResponse(['error' => 'Categorie not found'], 404);
        }
        return new JsonResponse($categorie, 200);
    }

    #[Route('/', methods: ['POST'], name: 'create')]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Validate required fields
        if (empty($data['nom'])) {
            return new JsonResponse(['error' => 'Missing required fields'], 400);
        }

        $categorie = new Categorie();
        $categorie->setNom($data['nom']);

        $this->entityManager->persist($categorie);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Categorie créée', 'id' => $categorie->getId()], 201);
    }

    #[Route('/{id}', methods: ['PUT'], name: 'update')]
    public function update(Request $request, Categorie $categorie): JsonResponse
    {
        if (!$categorie) {
            return new JsonResponse(['error' => 'Categorie not found'], 404);
        }

        $data = json_decode($request->getContent(), true);

        $categorie->setNom($data['nom'] ?? $categorie->getNom());

        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Categorie mise à jour'], 200);
    }

    #[Route('/{id}', methods: ['DELETE'], name: 'delete')]
    public function delete(Categorie $categorie): JsonResponse
    {
        if (!$categorie) {
            return new JsonResponse(['error' => 'Categorie not found'], 404);
        }

        $this->entityManager->remove($categorie);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Categorie supprimée'], 200);
    }
}
