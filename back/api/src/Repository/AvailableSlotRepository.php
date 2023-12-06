<?php

namespace App\Repository;

use App\Entity\AvailableSlot;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AvailableSlot>
 *
 * @method AvailableSlot|null find($id, $lockMode = null, $lockVersion = null)
 * @method AvailableSlot|null findOneBy(array $criteria, array $orderBy = null)
 * @method AvailableSlot[]    findAll()
 * @method AvailableSlot[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AvailableSlotRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AvailableSlot::class);
    }

//    /**
//     * @return AvailableSlot[] Returns an array of AvailableSlot objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?AvailableSlot
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
