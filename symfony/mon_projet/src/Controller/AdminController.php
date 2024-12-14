<?php

namespace App\Controller;

use App\Entity\BonPlan;
use App\Repository\BonPlanRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class AdminController extends AbstractController
{
    #[Route('/client/like/{id}', name: 'like_bonplan', methods: ['POST'])]
    public function likeBonPlan(
        BonPlan $bonPlan,
        EntityManagerInterface $em
    ): JsonResponse {
        $user = $this->getUser(); // Ensure authentication is in place

        if (!$user) {
            return new JsonResponse(['message' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        // Check if the user has already liked the BonPlan
        if ($bonPlan->getLikedBy()->contains($user)) {
            return new JsonResponse(['message' => 'You have already liked this Bon Plan'], Response::HTTP_BAD_REQUEST);
        }

        $bonPlan->addLikedBy($user);

        $em->persist($bonPlan);
        $em->flush();

        return new JsonResponse(['message' => 'Bon Plan liked successfully']);
    }
}
