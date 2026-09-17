-- je garde ce fichier ici à titre éducatif/ pour le retrouver facilement en cas de besoin.
-- c'est pas ce document précis qu'on utilise pour créer la BD, on utilise un client SQL -MySQLWorkbench ici.
-- Création de la base de données.
CREATE DATABASE IF NOT EXISTS app_activities;
USE app_activities;

-- Suppression de la table si elle existe déjà (pour repartir de zéro si besoin)
DROP TABLE IF EXISTS activities;

-- Création de la table activities.
CREATE TABLE IF NOT EXISTS activities(
                                         id INT AUTO_INCREMENT PRIMARY KEY,
                                         name VARCHAR(100) NOT NULL,
    description TEXT,
    location VARCHAR(100),
    date VARCHAR(50) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    max_participants INT
    );

-- Insertion des données de test dans la table activities
INSERT INTO activities (name, description, location, date, duration, max_participants) VALUES
                                                                                           ('Tournoi de Jass', 'Tournoi traditionnel de cartes au CPNV', 'Cafétéria', '2026-09-25', '2h00', 16),
                                                                                           ('Atelier LAN Party', 'Session de jeu en réseau entre étudiants', 'Salle de conférence', '2026-09-30', '4h00', 30),
                                                                                           ('Initiation Escalade', 'Sortie grimpe en extérieur', 'Parc extérieur', '2026-10-05', '3h00', 12),
                                                                                           ('Atelier Python', 'Introduction à la programmation Python pour débutants', 'Laboratoire 3', '2026-10-10', '2h30', 20),
                                                                                           ('Tournoi de Ping-Pong', 'Compétition amicale de tennis de table', 'Préau', '2026-10-15', '1h30', 16),
                                                                                           ('Soirée Jeux de Société', 'Découverte de jeux de plateau modernes', 'Cafétéria', '2026-10-20', '3h00', 25),
                                                                                           ('Conférence Cybersécurité', 'Sensibilisation aux bonnes pratiques sur le web', 'Aula', '2026-10-25', '1h30', 100);
