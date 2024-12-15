<?php

namespace App\Controller;

use App\Repository\OverviewRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ApiOverviewController extends AbstractController
{
    #[Route('/api/overview', name: 'api_overview', methods: ['GET'])]
    public function index(OverviewRepository $overviewRepository): JsonResponse
    {
        $data = $overviewRepository->findAll();

        $response = array_map(function ($item) {
            return [
                'name' => $item->getName(),
                'value' => $item->getValue(),
                'change' => $item->getChange(),
            ];
        }, $data);

        return $this->json($response);
    }
}
