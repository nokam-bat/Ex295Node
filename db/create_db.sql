-- Je garde ce fichier ici comme trace mais je vais devoir le créer dans un client SQL.
-- Création de la base de données.
CREATE DATABASE IF NOT EXISTS app_activities;
USE app_activities;

-- Création de la table activities.
CREATE TABLE IF NOT EXISTS activities(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date VARCHAR(50) NOT NULL,
    duration VARCHAR(50) NOT NULL
);

-- Insertion des données dans la table activities
INSERT INTO activities (name, date, duration) VALUES
                                                  ('Natation', '10.10.2025', '2'),
                                                  ('Escalade', '12.10.2025', '3');
