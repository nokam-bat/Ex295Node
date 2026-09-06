import express from 'express';
import activitiesRouter from './routes/activities.js';
//activitiesRouter c'est le nom de la variable que j'ai choisi

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
app.use('/api', activitiesRouter);

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost: ${port}`);
});