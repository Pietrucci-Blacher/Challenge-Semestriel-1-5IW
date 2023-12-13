<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\Provider\GetCollectionServices;
use App\Repository\ServiceRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\OpenApi\Model;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\User\SearchService;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;

#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/services/me',
            controller: GetCollectionServices::class,
            openapi: new Model\Operation(
                responses: [
                    '200' => [
                        'description' => 'Retrieves the establishments of the current provider.',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'array',
                                    'items' => [
                                        '$ref' => '#/components/schemas/Establishment',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                summary: 'Retrieves the establishments of the current provider.',
            ),
            security: 'is_granted("ROLE_PROVIDER")',
            securityMessage: 'Il faut être un prestataire pour accéder à ses établissements.',
        ),
        new GetCollection(
            normalizationContext: ['groups' => ['service:read']],
            security: 'is_granted("ROLE_PROVIDER")',
        ),
        new Post(
            security: 'is_granted("ROLE_PROVIDER")',
        ),
        new Get(
            normalizationContext: ['groups' => ['service:read']],
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_PROVIDER") and object.getAuthor() == user)',
            securityMessage: 'Vous ne pouvez accéder qu\'à vos établissements.',
        ),
        new Put(
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_PROVIDER") and object.getAuthor() == user)',
            securityMessage: 'Vous ne pouvez modifier que vos services.',
        ),
        new Patch(
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_PROVIDER") and object.getAuthor() == user)',
            securityMessage: 'Vous ne pouvez modifier que vos services.',
        ),
        new Delete(
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_PROVIDER") and object.getAuthor() == user)',
            securityMessage: 'Vous ne pouvez supprimer que vos services.',
        ),

    ],
    normalizationContext: ['groups' => ['service:read']],
    mercure: true,
)]
#[ApiFilter(SearchFilter::class, properties: ['title' => 'partial', 'description' => 'partial'])]
#[ORM\Entity(repositoryClass: ServiceRepository::class)]
class Service
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['service:read', 'service:write'])]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    #[Groups(['service:read', 'service:write'])]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    #[Groups(['service:read', 'service:write'])]
    private ?string $price = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['service:read', 'service:write'])]
    private ?string $body = null;

    /* #[ORM\ManyToOne(inversedBy: 'services')] */
    #[ORM\ManyToOne()]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['service:read', 'service:write'])]
    private ?Establishment $establishment = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getBody(): ?string
    {
        return $this->body;
    }

    public function setBody(string $body): static
    {
        $this->body = $body;

        return $this;
    }

    public function getEstablishment(): ?Establishment
    {
        return $this->establishment;
    }

    public function setEstablishment(?Establishment $establishment): static
    {
        $this->establishment = $establishment;

        return $this;
    }
}
