import express from 'express';
import routerActivities from './routes/activities.js';
//routerActivities c'est le nom de la variable que j'ai choisi, elle correspond à ce que j'ai exporté dans activities.js

const app = express();
// chercher .env ou 3000
const port = process.env.PORT || 3000;

// Middlewear pour traduire du json en objet
// utile pour les POST/PUT
app.use(express.json());

// route de base
app.get('/', (req, res) => {
    res.send('Bienvenu sur mon API CPNV');
});

// Etape 5: Redirection de /api vers /
app.get('/api', (req, res) =>{
    res.redirect('/');
});

// Utilisation du routeur pour toutes les routes de l'API concenant les activités
app.use('/api', routerActivities);

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});