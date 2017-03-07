const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
const ObjectID = require('mongodb').ObjectID;
// variable qui contiendra le lien sur la BD
let db;

app.set('view engine', 'ejs'); // générateur de template «ejs»

// parse application/x-www-form-urlencoded
let urlencodedParser = bodyParser.urlencoded({ extended: false })

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//pour avoir acces au dossier public et le css
app.use(express.static(__dirname + "/public"));

app.post('/detruire/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    db.collection('adresse').findOneAndDelete({
        "_id": ObjectID(req.params.id)
    }, (err, resultat) => {
        if (err)
            return console.log(err)
        res.redirect('/') // redirige vers la route qui affiche la collection
    })
})

app.post("/modifier", urlencodedParser,(req, res) => {
    const id = req.body._id;
    const data = req.body;
    const lesDonnees = {
        "nom": data.nom,
        "prenom": data.prenom,
        "telephone":data.telephone,
        "ville":data.ville,
        "postal":data.postal
    }
    console.log(data);
    db.collection('adresse').update({
        "_id": ObjectID(id)
    }, lesDonnees , (err, resultat) => {
        if (err)
            return console.log(err)
        res.redirect('/') // redirige vers la route qui affiche la collection
    });
});

//pour se connecter à la base de donnée Mongo
MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
    if (err)
        return console.log(err)
    db = database
    app.listen(8081, () => {
        console.log('connexion à la BD et on écoute sur le port 8081')
    })
})

//acces au fichier index
app.get('/', (req, res) => {
    console.log('la route route get / = ' + req.url)

    var cursor = db.collection('adresse').find().toArray(function(err, resultat) {
        if (err)
            return console.log(err)
            // renders index.ejs
        // affiche le contenu de la BD
        res.render('index.ejs', {adresse: resultat})

    })
})



//avoir acces au formulaire
app.get('/formulaire', (req, res) => {
    console.log('la route  get / = ' + req.url)
    res.sendFile(__dirname + "/public/html/forme.htm")
})

//requete post lorsque le formulaire est submit
app.post('/adresse', (req, res) => {
    //on sauvegarde les données dans la DB mongo
    db.collection('adresse').save(req.body, (err, result) => {
        if (err)
            return console.log(err)
        console.log('sauvegarder dans la BD')
        //redirige vers /
        res.redirect('/')
    })
})
