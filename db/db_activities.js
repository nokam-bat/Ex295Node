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
    // getAllActivities est une fonction qui va chercher toutes les activités depuis ma base de donnée.
    getAllActivities: async () => { // c'est une fonction asynchrone
        const [rows] = await poolConn.execute('SELECT * FROM activities');
        //await dit à la fonction d'attendre la réponse de la BD.
        //pendant que cette fonction attends la réponse de la BD, le serveur Node.js n'est pas bloqué.
        //Node.js pourra aini s'occuper d'autres utilisateurs/tâches sans être figé par l'attente de la réponse.
        //poolConn.execute() envoie la requête SQL entre ('') via le pool de connection.
        // const[rows]sert à déstructurer le tableau de données(lignes de la table) et de métadonnées(infos sur les colonnes)
        // quand mysql2 réponds à une requête, il envoie un tableau de données en deux éléments (données/lignes et métadonnées/colonnes)
        // const[rows] permets de dire qu'on veut récupérer que les données du tableau et qu'on veut les stocker dans la variable rows.
            // son équivalent est const result = await poolConn.execute('SELECT * FROM activities');
            //const rows = result[0]; (0 car on prends le premier champ. le deuxième est 1)
        return rows; //ça renvoie donc les données récupérées.
    },

    //getActivitiesById est une fonction qui affiche une activitée donnée par l'user via son Id
    getActivitiesById: async (id) => {
        cost [rows] = await poolConn.execute('SELECT * FROM activities WHERE id = ?', [id]);
        return rows[0];
    }
}
