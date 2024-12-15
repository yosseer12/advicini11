<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
class Utilisateur
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['utilisateur'])]
    private ?int $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['utilisateur'])]
    #[Assert\NotBlank(message: 'Le nom est obligatoire.')]
    private ?string $nom;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['utilisateur'])]
    #[Assert\NotBlank(message: 'Le prénom est obligatoire.')]
    private ?string $prenom;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Groups(['utilisateur'])]
    #[Assert\NotBlank(message: 'L\'email est obligatoire.')]
    #[Assert\Email(message: 'L\'email doit être valide.')]
    private ?string $email;

    #[ORM\Column(type: 'string')]
    private ?string $motDePasse;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['utilisateur'])]
    private ?bool $isAdmin;

    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups(['utilisateur'])]
    private ?string $localisation;

    // Getters et setters ici...
}
