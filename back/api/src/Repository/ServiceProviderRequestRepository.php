<?php

namespace App\Repository;

use App\Entity\ServiceProviderRequest;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ServiceProviderRequest>
 *
 * @method ServiceProviderRequest|null find($id, $lockMode = null, $lockVersion = null)
 * @method ServiceProviderRequest|null findOneBy(array $criteria, array $orderBy = null)
 * @method ServiceProviderRequest[]    findAll()
 * @method ServiceProviderRequest[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ServiceProviderRequestRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ServiceProviderRequest::class);
    }

//    /**
//     * @return ServiceProviderRequest[] Returns an array of ServiceProviderRequest objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ServiceProviderRequest
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
