<?php

namespace App\Entity;

use App\Repository\CategorieRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategorieRepository::class)]
class Categorie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    private string $nom;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $description = null;

    /**
     * @var Collection<int, BonPlan>
     */
    #[ORM\ManyToMany(targetEntity: BonPlan::class, mappedBy: 'bonplan')]
    private Collection $bonPlans;

    public function __construct()
    {
        $this->bonPlans = new ArrayCollection();
    }

    // Getter and Setter methods

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }

    /**
     * @return Collection<int, BonPlan>
     */
    public function getBonPlans(): Collection
    {
        return $this->bonPlans;
    }

    public function addBonPlan(BonPlan $bonPlan): static
    {
        if (!$this->bonPlans->contains($bonPlan)) {
            $this->bonPlans->add($bonPlan);
            $bonPlan->addBonplan($this);
        }

        return $this;
    }

    public function removeBonPlan(BonPlan $bonPlan): static
    {
        if ($this->bonPlans->removeElement($bonPlan)) {
            $bonPlan->removeBonplan($this);
        }

        return $this;
    }
}
