<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231026211236 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE greeting_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE teacher_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE teacher (id INT NOT NULL, teacher_id INT NOT NULL, service_id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_B0F6A6D541807E1D ON teacher (teacher_id)');
        $this->addSql('CREATE INDEX IDX_B0F6A6D5ED5CA9E6 ON teacher (service_id)');
        $this->addSql('ALTER TABLE teacher ADD CONSTRAINT FK_B0F6A6D541807E1D FOREIGN KEY (teacher_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE teacher ADD CONSTRAINT FK_B0F6A6D5ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE greeting');
        $this->addSql('ALTER TABLE available_slot ADD teacher_id INT NOT NULL');
        $this->addSql('ALTER TABLE available_slot ADD CONSTRAINT FK_733DF5DD41807E1D FOREIGN KEY (teacher_id) REFERENCES teacher (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_733DF5DD41807E1D ON available_slot (teacher_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE available_slot DROP CONSTRAINT FK_733DF5DD41807E1D');
        $this->addSql('DROP SEQUENCE teacher_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE greeting_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE greeting (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE teacher DROP CONSTRAINT FK_B0F6A6D541807E1D');
        $this->addSql('ALTER TABLE teacher DROP CONSTRAINT FK_B0F6A6D5ED5CA9E6');
        $this->addSql('DROP TABLE teacher');
        $this->addSql('DROP INDEX IDX_733DF5DD41807E1D');
        $this->addSql('ALTER TABLE available_slot DROP teacher_id');
    }
}
