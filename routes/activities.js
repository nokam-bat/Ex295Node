import express from 'express'; //on a besoin de express pour appeler la fonction express.Router()
import activities from '../db/mock-activities.js'; // <- Elle va ici maintenant !

const routerActivities= express.Router(); //cette fonction permets de créer un sous-routeur
// pour info on va aussi faire des opérations CRUD (Create, Read, Update, Delete)

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


// 3. Route pour supprimer une activité donnée (DELETE)
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

// 4. Route pour Ajouter une activité donnée par le client (POST)
routerActivities.post('/activities', (req, res) => {
        // Comme on utilise POST pour créer une activité, on mets pas /activities/:id étant donné que l'id existe pas encore

    // 0. Sécurité: Vérifier que le client a bien envoyé un nom (sinon erreur 400 Bad Request)
    if (!req.body.name){
        // Que fait req.body.name?
        // Il évalue si la propriété name est manquante (si elle vaut undefined, null ou un string vide "").
        // ! l'inverse pour le mettre en false si il était true et true s'il était false
        // en gros! raccourci une ligne de code chiante de conditions
        return res.status(400).json({message: "Le nom de l'activité est obligatoire."});
        //on mets return car on est dans un if et on veut interrompre et stopper la fonction directe si les données sont mauvaises.
    }

    // 1. Caculer le nouvel ID automatiquement en cherchant le max des id existants
    const ids =activities.map(activity => activity.id);     // la constante ids est la liste/ le tableau de tous les ID actuels.
    // ids est la variable où on va stocker le nouveau tableau de chiffres crée par .map() qui va contenir tous les id disponible.
    // .map() est une fonction native de JS qui appartient aux tableaux.
    // Elle parcourt un tableau pour en recréer un autre exclusivement en chiffres.
    // ici elle prends la liste d'objet d'activités et transorme tous les id en chiffres. Ex: [1,2,3,7]
    const maxId = Math.max(...ids);     // Math est la boite à outil JS pour les maths.
    // .max() a BESOIN des trois petits points ... pour lire le tableau ids
    // .max() va trouver l'id le plus grand et en dessous on va rajouter 1
    const id = maxId + 1;    // on rajoute 1 chiffre au nombre maximum vu qu'on créer un new objet.

    //2. Créer le nouvel objet en combinant le nouvel id et les données envoyées par le client (req.body)
    const newActivity = {id, ...req.body};  // la variable id a le même nom que la propriété de l'objet que je veux créer (dans le tableau on a id comme clé pour la première clé-valeur)
    // donc écrire id ici revient à écrire id:id  (rappel qu'on a calculé l'id en rajoutant 1 au maxId)
    // on sépare  les propriétés de l'objet en cours de fabrication avec les virgules
    // ...req.body c'est ce qui contient toutes les données que le client a tapées au format JSON.
    // les trois petits points... permettent de déballer/ copier toutes les propriétés une à une pour les injecter dans le nouvel objet.

    //3. Ajouter l'élement dans le tableau mock (dans mon fichier mock-activties.js)
    activities.push(newActivity);

    //4. Renvoyer un message de succès et le statut HTTP 201 (Created)
    const message = `L'activité ${newActivity.name} a bien été créee.`;
    res.status(201).json({message, data: newActivity});
    // La convention REST (API_REST) impose le code 201 Created quand on utilise une méthode POST
})

// 5. Route PUT: Mettre à jour une activité existante par son ID
// Mise à jour totale = PUT
// Mise à jour partielle = PATCH
routerActivities.put('/activities/:id', (req, res) => {
    //1. Récupérer l'id dans l'URL et le convertir en nombre entier
    const id = parseInt(req.params.id);

    //2. Chercher la position (l'index) de l'activité dans le tableau activities
    const activityIndex = activities.findIndex(activity => activity.id === id);

    //3. Sécurité: Vérifier si l'activité existe, sinon erreur 404 Not Found
    if (activityIndex === -1){  //si elle existe pas, on donne le msg et on stop.
        return res.status(404).json({message: `L'activité demandée n'a pas été trouvée.`});
    }

    //4. Mettre à jour l'activité en ccombinant l'ancien objet et les nouvelles données du client req.body
    // on force l'id é rester le même pour éviter qu'il soit écrasé ou modifié
    const updatedActivity = { ...activities[activityIndex], ...req.body, id};
    // Les anciennes données: ...activities[activityIndex]
    // Les modifications du client: ...req.body (ce qu'il a changé va écrasé les anciennes données correspondantes)
    // le vérouillage de sécurité de l'id: id   ça empêchera le client de changer l'id s'il essaie
    // On remplace l'ancienne activité par la nouvelle dans le tableau mock-activities
    activities[activityIndex] = updatedActivity;

    //5. Renvoyer un message de succès et le statut HTTP 200 OK
    const message = `L'activité ${updatedActivity.name} a bien été mise à jour`;
    res.json({message, data: updatedActivity});


})



export default routerActivities;

