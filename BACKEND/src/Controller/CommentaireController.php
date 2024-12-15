<?php

namespace App\Controller;

use App\Entity\Commentaire;
use App\Repository\CommentaireRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/commentaire', name: 'api_commentaire_')]
class CommentaireController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/', methods: ['GET'], name: 'list')]
    public function list(CommentaireRepository $repository): JsonResponse
    {
        $commentaires = $repository->findAll();
        return new JsonResponse($commentaires, 200);
    }

    #[Route('/{id}', methods: ['GET'], name: 'show')]
    public function show(Commentaire $commentaire): JsonResponse
    {
        if (!$commentaire) {
            return new JsonResponse(['error' => 'Commentaire not found'], 404);
        }
        return new JsonResponse($commentaire, 200);
    }

    #[Route('/', methods: ['POST'], name: 'create')]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Validate required fields
        if (empty($data['contenu']) || !isset($data['utilisateur']) || !isset($data['bonPlan'])) {
            return new JsonResponse(['error' => 'Missing required fields'], 400);
        }

        $commentaire = new Commentaire();
        $commentaire->setContenu($data['contenu']);
        $commentaire->setDate(new \DateTime());
        $commentaire->setNote($data['note']);


        $utilisateur = $this->entityManager->getRepository(Utilisateur::class)->find($data['utilisateur']);
        if (!$utilisateur) {
            return new JsonResponse(['error' => 'Utilisateur not found'], 404);
        }
        $commentaire->setUtilisateur($utilisateur);

        // Assuming the BonPlan exists (it should be validated)
        $bonPlan = $this->entityManager->getRepository(BonPlan::class)->find($data['bonPlan']);
        if (!$bonPlan) {
            return new JsonResponse(['error' => 'BonPlan not found'], 404);
        }
        $commentaire->setBonPlan($bonPlan);

        $this->entityManager->persist($commentaire);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Commentaire créé', 'id' => $commentaire->getId()], 201);
    }

    #[Route('/{id}', methods: ['PUT'], name: 'update')]
    public function update(Request $request, Commentaire $commentaire): JsonResponse
    {
        if (!$commentaire) {
            return new JsonResponse(['error' => 'Commentaire not found'], 404);
        }

        $data = json_decode($request->getContent(), true);

        $commentaire->setContenu($data['contenu'] ?? $commentaire->getContenu());
        $commentaire->setNote($data['note'] ?? $commentaire->getNote());

        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Commentaire mis à jour'], 200);
    }

    #[Route('/{id}', methods: ['DELETE'], name: 'delete')]
    public function delete(Commentaire $commentaire): JsonResponse
    {
        if (!$commentaire) {
            return new JsonResponse(['error' => 'Commentaire not found'], 404);
        }

        $this->entityManager->remove($commentaire);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Commentaire supprimé'], 200);
    }
}
