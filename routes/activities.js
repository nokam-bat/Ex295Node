import express from 'express'; //on a besoin de express pour appeler la fonction express.Router()
import activities from '../db/mock-activities.js'; // <- Elle va ici maintenant !

const routerActivities= express.Router(); //cette fonction permets de créer un sous-routeur


// 1. Route pour récupérer toutes les activités
routerActivities.get('/activities', (req, res) => {
    const message = 'La liste des activités a bien été récupérée.';
    res.json({ message, data: activities });
});

// 2. Route pour récupérer une activité spécifique par son ID
routerActivities.get('/activities/:id', (req, res) => {
    const id = parseInt(req.params.id); //parseInt converti un String en int
     //req.params.id : Permet de récupérer ce que l'utilisateur a tapé dans l'URL.
    // Comme l'URL renvoie du texte, on utilise parseInt() pour le transformer en nombre.
    // on veut un int car l'id dans mock-activities est un int

    const activity = activities.find(activity => activity.id ===id);
    // activities c'est le tableau de données importé en haut
    // .find() parcours tous les tableaux et s'arrête quand elle trouve le bon.
    // en gros .find() permets de chercher et récupérer l'élément.
    // activity => activity.id === id c'est une fonction flêchée qui agit comme un filtre:
    // pour chaque élément du tableau qu'on appelle temporairement activity,
    // elle vérifie si son id (activity.id) est égale à l'id récupéré de l'URL
    //const activity pour stocker l'objet trouvé et la renvoyer dans la réponse json (data: activity)

    const message = `L'activité avec l'identifiant ${id} a bien été récupéré.`;
    res.json({ message, data: activity});
});


// 3. Route pour supprimer une activité donnée
routerActivities.delete('/activities/:id', (req, res) => {
    const id = parseInt(req.params.id); // req.params.id nous permets de connaître l'id à chercher.
    const activityIdIndex = activities.findIndex(activity => activity.id === id); //rappel que parseInt aura changé id en int.
    // activityIdIndex c'est la variable où on va mettre la position de l'id/ l'objet/ l'activité qui se trouve dans le tableau qu'on cherche.
    // on utilise id pour activityIDIndex car dans le tableau, id correspond à la valeur unique de l'objet dans le tableau.
    // l'index c'est sa position dans le tableau
    // là on utilise .findIndex() pour trouver la position et pas .find()
    // .findIndex() permets de trouver/ renvoyer la position numérique de l'objet das le tableau.
    // .find() permets de trouver/ renvoyer l'objet complet ( ex: {id: 1, name: 'Natation'})
    // là on va avoir besoin de .splice() pour supprimer l'objet du tableau.
    // pour rappel, .splice(quel  (id est le terme ici)/position supprimer, combien d'élément à supprimer) a besoin de savoir quel élément supprimer et combien d'éléments à supprimer.
    // donc on lui précise la position et de combien on supprime dans ses paramètres.
    // Avant de splice,faut vérifier/ prévenir les erreurs si la position de l'id existe pas
    // Pour ça on utilise des conditions et on vérifie si activityIdIndex se trouve dans la liste ou pas
    // on peut utiliser `(activityIdIndex !== -1)` ou `activityIdIndex === -1` mais faut écrire la suite en conséquence
    // rappel que === veut dire complètement égale et !== veut dire le contraire/ n'est pas
    if (activityIdIndex !== -1){    // si activityIdIndex, don l'id recherché existe/ ne correspond pas à n'existe pas:
        const deletedActivity = activities.splice(activityIdIndex, 1)[0]; //on supprime d'une position (1) l'activityIdIndex que l'utilisateu a spécifié
        // on utilise [0] pour extraire le premier objet du tableau retourné par .splice()
        // quand on utlise. splice(), cette fonction renvoie toujours un tableau qui contient l'objet supprimé
        // donc on précise qu'on veut qu'il affihe uniquement l'objet supprimé à la position [0] (ici c'est le premier objet du tableau activities [{objet avec id:1 et name:foot}])
        const message = `L'activité avec l'identifiant ${id} a bien été supprimée.`;
        return res.json({message, data: deletedActivity});
    } else {
        return res.status(404).json({message: "Le serveur n’a pas trouvé la ressource demandée"}); // ou on renvoie le code d'erreur 404 en réponse.json
    }
})








export default routerActivities;

