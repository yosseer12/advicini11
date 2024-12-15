<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241201151612 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE account (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, connected TINYINT(1) NOT NULL, icon VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE bon_plan DROP FOREIGN KEY FK_FEB1F6F2BCF5E72D');
        $this->addSql('DROP INDEX IDX_FEB1F6F2BCF5E72D ON bon_plan');
        $this->addSql('ALTER TABLE bon_plan ADD prix DOUBLE PRECISION NOT NULL, ADD date_debut DATETIME NOT NULL, ADD date_fin DATETIME NOT NULL, DROP categorie_id, DROP note_moyenne');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE account');
        $this->addSql('ALTER TABLE bon_plan ADD categorie_id INT DEFAULT NULL, ADD note_moyenne DOUBLE PRECISION DEFAULT NULL, DROP prix, DROP date_debut, DROP date_fin');
        $this->addSql('ALTER TABLE bon_plan ADD CONSTRAINT FK_FEB1F6F2BCF5E72D FOREIGN KEY (categorie_id) REFERENCES categorie (id)');
        $this->addSql('CREATE INDEX IDX_FEB1F6F2BCF5E72D ON bon_plan (categorie_id)');
    }
}
