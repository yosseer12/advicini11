<?php

namespace App\Repository;

use App\Entity\BonPlan;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method BonPlan|null find($id, $lockMode = null, $lockVersion = null)
 * @method BonPlan|null findOneBy(array $criteria, array $orderBy = null)
 * @method BonPlan[]    findAll()
 * @method BonPlan[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BonPlanRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BonPlan::class);
    }

}
