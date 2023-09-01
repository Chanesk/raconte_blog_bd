const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Raconte = require('./models/raconte');


app.use(express.json());

mongoose.connect('mongodb+srv://admin:xM8gSCsVESaCvuVX@cluster0.ta1dmua.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/:id', (req, res, next) => {
  Raconte.findOne({ _id: req.params.id })
    .then(raconte => res.status(200).json(raconte))
    .catch(error => res.status(404).json({ error }));
});

app.get('/', (req, res, next) => {
  Raconte.find()
    .then(racontes => res.status(200).json(racontes))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;