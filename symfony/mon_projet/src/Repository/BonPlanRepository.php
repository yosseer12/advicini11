<?php

namespace App\Repository;

use App\Entity\BonPlan;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class BonPlanRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BonPlan::class);
    }

    // Find Bons Plans by category
    public function findByCategory(string $category): array
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.category = :category')
            ->setParameter('category', $category)
            ->getQuery()
            ->getResult();
    }

    // Find trending Bons Plans (sorted by likes)
    public function findTrendingDeals(): array
    {
        return $this->createQueryBuilder('b')
            ->orderBy('b.likes', 'DESC')
            ->getQuery()
            ->getResult();
    }
}
