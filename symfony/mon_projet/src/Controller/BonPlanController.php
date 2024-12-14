<?php

namespace App\Controller;

use App\Entity\BonPlan;
use App\Repository\BonPlanRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class BonPlanController extends AbstractController
{
    private $entityManager;
    private $repository;

    public function __construct(EntityManagerInterface $entityManager, BonPlanRepository $repository)
    {
        $this->entityManager = $entityManager;
        $this->repository = $repository;
    }

    #[Route('/api/add-bonplan', name: 'add_bonplan', methods: ['POST'])]
    public function addBonPlan(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Validate input data
        if (empty($data['title']) || empty($data['latitude']) || empty($data['longitude'])) {
            return new JsonResponse(['message' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
        }

        // Create and populate the BonPlan entity
        $bonPlan = new BonPlan();
        $bonPlan->setTitle($data['title'])
            ->setDescription($data['description'] ?? '')
            ->setLatitude($data['latitude'])
            ->setLongitude($data['longitude']);

        // Persist the BonPlan to the database
        $this->entityManager->persist($bonPlan);
        $this->entityManager->flush();

        return new JsonResponse(
            ['message' => 'Bon Plan added successfully', 'id' => $bonPlan->getId()],
            Response::HTTP_CREATED
        );
    }

    #[Route('/api/bonsplans', name: 'get_all_bonsplans', methods: ['GET'])]
    public function getAllBonsPlans(): JsonResponse
    {
        $bonsPlans = $this->repository->findAll();
        return $this->json($bonsPlans);
    }

    #[Route('/api/category/{category}', name: 'get_bonsplans_by_category', methods: ['GET'])]
    public function getBonsPlansByCategory(string $category): JsonResponse
    {
        $bonsPlans = $this->repository->findBy(['category' => $category]);
        return $this->json($bonsPlans);
    }

    #[Route('/api/trending', name: 'get_trending_bonsplans', methods: ['GET'])]
    public function getTrendingBonsPlans(): JsonResponse
    {
        $trendingDeals = $this->repository->findTrendingDeals();
        return $this->json($trendingDeals);
    }

    #[Route('/api/nearby', name: 'get_nearby_bonsplans', methods: ['GET'])]
    public function getNearbyBonsPlans(Request $request): JsonResponse
    {
        $latitude = $request->query->get('latitude');
        $longitude = $request->query->get('longitude');

        if ($latitude === null || $longitude === null) {
            return new JsonResponse(['message' => 'Latitude and longitude are required'], Response::HTTP_BAD_REQUEST);
        }

        $allDeals = $this->repository->findAll();
        $nearbyDeals = array_filter($allDeals, function ($deal) use ($latitude, $longitude) {
            $distance = sqrt(
                pow($deal->getLatitude() - $latitude, 2) +
                pow($deal->getLongitude() - $longitude, 2)
            );
            return $distance < 0.1; // Example threshold
        });

        return $this->json($nearbyDeals);
    }
}
