<?php

namespace src\Repository;

use src\Entity\TeamInvitation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<TeamInvitation>
 *
 * @method TeamInvitation|null find($id, $lockMode = null, $lockVersion = null)
 * @method TeamInvitation|null findOneBy(array $criteria, array $orderBy = null)
 * @method TeamInvitation[]    findAll()
 * @method TeamInvitation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TeamInvitationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TeamInvitation::class);
    }

//    /**
//     * @return TeamInvitation[] Returns an array of TeamInvitation objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('t.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?TeamInvitation
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
    public function findOneByUserAndEstablishment($userId, $establishmentId) : ?TeamInvitation
    {
        return $this->createQueryBuilder('t')
            ->where('t.member = :userId')
            ->andWhere('t.establishment = :establishmentId')
            ->setParameter('userId', $userId)
            ->setParameter('establishmentId', $establishmentId)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
