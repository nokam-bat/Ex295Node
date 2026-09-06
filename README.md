# Ex295Node
## Projet Node Back-end

**Installer l'environnement**
Installer Express:
`npm install express --save`

Installer Nodemon:
`npm install nodemon --save-dev`
Modifier le package.json en ajoutant dans script:
`"scripts": {
"test": "echo \"Error: no test specified\" && "exit 1",
"start": "nodemon app.js`
le lancer:
`npm run start`


Pour les tests:
utiliser Postman.


**Créer un nouveau projet Node et mise en place du versioning**
`npm init` pour installer le package.json dans mon dépôt
et mettre le type en module

### API GET
Création d'une API avec Node et Express.
Créer un nouveau projet Node.
Créer un point de terminaison /api/activities et implémenter le code pour accéder aux données sur les activités.
Créer la reditection /api=> /
Refactoring
Gestion d'événement
Ajouter une route permettant d'afficher une activité choisie à l'aide de son identifiant.

### API POST, PUT, DELETE
Création d'une API de gestion des activités au CPNV: POST,PUT,DELETE