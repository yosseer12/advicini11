<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ConnectedAccountController
{
#[Route('/api/connected-accounts', methods: ['POST'])]
public function addConnectedAccount(Request $request): JsonResponse
{
$data = json_decode($request->getContent(), true);

return new JsonResponse([
'success' => true,
'account' => $data,
]);
}
}
