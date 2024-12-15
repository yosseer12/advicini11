<?php

namespace App\Entity;

use App\Repository\CommentaireRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CommentaireRepository::class)]
class Commentaire
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'text')]
    private string $contenu;

    #[ORM\Column(type: 'datetime')]
    private \DateTime $date;

    #[ORM\Column(type: 'integer')]
    private int $note;

    #[ORM\ManyToOne(targetEntity: Utilisateur::class, inversedBy: 'commentaires')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Utilisateur $utilisateur = null;

    #[ORM\ManyToOne(targetEntity: BonPlan::class, inversedBy: 'commentaires')]
    #[ORM\JoinColumn(nullable: false)]
    private ?BonPlan $bonPlan = null;

    #[ORM\ManyToOne(inversedBy: 'user')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Utilisateur $commentaire = null;

    public function __construct()
    {

        $this->date = new \DateTime();
    }



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContenu(): string
    {
        return $this->contenu;
    }

    public function setContenu(string $contenu): self
    {
        $this->contenu = $contenu;
        return $this;
    }

    public function getDate(): \DateTime
    {
        return $this->date;
    }

    public function setDate(\DateTime $date): self
    {
        $this->date = $date;
        return $this;
    }

    public function getNote(): int
    {
        return $this->note;
    }

    public function setNote(int $note): self
    {
        $this->note = $note;
        return $this;
    }

    public function getUtilisateur(): ?Utilisateur
    {
        return $this->utilisateur;
    }

    public function setUtilisateur(?Utilisateur $utilisateur): self
    {
        $this->utilisateur = $utilisateur;
        return $this;
    }

    public function getBonPlan(): ?BonPlan
    {
        return $this->bonPlan;
    }

    public function setBonPlan(?BonPlan $bonPlan): self
    {
        $this->bonPlan = $bonPlan;
        return $this;
    }

    public function getCommentaire(): ?Utilisateur
    {
        return $this->commentaire;
    }

    public function setCommentaire(?Utilisateur $commentaire): static
    {
        $this->commentaire = $commentaire;

        return $this;
    }
}
