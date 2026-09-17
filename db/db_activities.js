// Ici c'est la connexion à la base de donnée app_activities
import mysql from 'mysql2/promise'; // ça représente la connexuion à la base de donnée.
// ici c'est l'import de dotenv qui doit gérer le fichier .env
import 'dotenv/config';

// la constante qui va suivre est une manière plus sécurisée pour se connecter
const poolConnection = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.databaseb,
    port: process.env.port,

    //là on va mettre des options de gestion du pool
    waitForConnections: true, //si tout est occupé, la requête attends qu'une co se libère
    connectionLimit: process.env.connectionLimit, // nombre max de connections simultanées autorisées
    queueLimit: 0 // 0 = file d'attente illimitée pour les requêtes en attente.
})

// là on crée un objet db
// Cet objet db va grouper les différentes opérations/applications qui peuvent être performées sur la base de donnée
const db = {
    
}
