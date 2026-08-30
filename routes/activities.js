import express from 'express'; //on a besoin de express pour appeler la fonction express.Router()
import activities from '../db/mock-activities.js'; // <- Elle va ici maintenant !

const router= express.Router(); //cette fonction permets de créer un sous-routeur


// 1. Route pour récupérer toutes les activités
router.get('/activities', (req, res) => {
    const message = 'La liste des activités a bien été récupérée.';
    res.json({ message, data: activities });
});

// 2. Route pour récupérer une activité spécifique par son ID
router.get('/activities/:id', (req, res) => {
    const id = parseInt(req.params.id); //parseInt converti un String en int
     //req.params.id : Permet de récupérer ce que l'utilisateur a tapé dans l'URL.
    // Comme l'URL renvoie du texte, on utilise parseInt() pour le transformer en nombre.

    const activity = activities.find(activity => activity.id ===id);
    // activities c'est le tableau de données importé en haut
    // .find() parcours tous les tableaux et s'arrête quand elle trouve le bon
    // activity => activity.id === id c'est une fonction flêchée qui agit comme un filtre:
    // pour chaque élément du tableau qu'on appelle temporairement activity,
    // elle vérifie si son id (activity.id) est égale à l'id récupéré de l'URL
    //const activity pour stocker l'objet trouvé et la renvoyer dans la réponse json (data: activity)

    const message = `L'activité avec l'identifiant ${id} a bien été récupéré.`;
    res.json({ message, data: activity});
});

export default router;

