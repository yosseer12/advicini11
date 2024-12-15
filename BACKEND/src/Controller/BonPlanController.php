<?php

namespace App\Controller;

use App\Entity\BonPlan;
use App\Repository\BonPlanRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/bon-plan', name: 'api_bon_plan_')]
class BonPlanController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/', methods: ['GET'], name: 'list')]
    public function list(BonPlanRepository $repository): JsonResponse
    {
        $bonPlans = $repository->findAll();
        return new JsonResponse($bonPlans, 200);
    }

    #[Route('/{id}', methods: ['GET'], name: 'show')]
    public function show(BonPlan $bonPlan): JsonResponse
    {
        if (!$bonPlan) {
            return new JsonResponse(['error' => 'BonPlan not found'], 404);
        }
        return new JsonResponse($bonPlan, 200);
    }

    #[Route('/', methods: ['POST'], name: 'create')]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Validate required fields
        if (empty($data['titre']) || empty($data['description']) || empty($data['localisation']) || !isset($data['utilisateur'])) {
            return new JsonResponse(['error' => 'Missing required fields'], 400);
        }

        $bonPlan = new BonPlan();
        $bonPlan->setTitre($data['titre']);
        $bonPlan->setDescription($data['description']);
        $bonPlan->setLocalisation($data['localisation']);
        $bonPlan->setNoteMoyenne($data['noteMoyenne'] ?? null);

        // Assuming the user exists (it should be validated)
        $utilisateur = $this->entityManager->getRepository(Utilisateur::class)->find($data['utilisateur']);
        if (!$utilisateur) {
            return new JsonResponse(['error' => 'Utilisateur not found'], 404);
        }
        $bonPlan->setUtilisateur($utilisateur);

        // Assuming the category exists (it should be validated)
        if (isset($data['categorie'])) {
            $categorie = $this->entityManager->getRepository(Categorie::class)->find($data['categorie']);
            if ($categorie) {
                $bonPlan->setCategorie($categorie);
            }
        }

        $this->entityManager->persist($bonPlan);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'BonPlan créé', 'id' => $bonPlan->getId()], 201);
    }

    #[Route('/{id}', methods: ['PUT'], name: 'update')]
    public function update(Request $request, BonPlan $bonPlan): JsonResponse
    {
        if (!$bonPlan) {
            return new JsonResponse(['error' => 'BonPlan not found'], 404);
        }

        $data = json_decode($request->getContent(), true);

        $bonPlan->setTitre($data['titre'] ?? $bonPlan->getTitre());
        $bonPlan->setDescription($data['description'] ?? $bonPlan->getDescription());
        $bonPlan->setLocalisation($data['localisation'] ?? $bonPlan->getLocalisation());
        $bonPlan->setNoteMoyenne($data['noteMoyenne'] ?? $bonPlan->getNoteMoyenne());

        $this->entityManager->flush();

        return new JsonResponse(['status' => 'BonPlan mis à jour'], 200);
    }

    #[Route('/{id}', methods: ['DELETE'], name: 'delete')]
    public function delete(BonPlan $bonPlan): JsonResponse
    {
        if (!$bonPlan) {
            return new JsonResponse(['error' => 'BonPlan not found'], 404);
        }

        $this->entityManager->remove($bonPlan);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'BonPlan supprimé'], 200);
    }
}
