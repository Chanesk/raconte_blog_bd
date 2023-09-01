const Raconte = require('../models/raconte');

exports.getOneRaconte = (req, res, next) => {
  Raconte.findOne({ _id: req.params.id })
    .then(raconte => res.status(200).json(raconte))
    .catch(error => res.status(404).json({ error }));
}

exports.getAllRaconte = (req, res, next) => {
  Raconte.find()
    .then(racontes => res.status(200).json(racontes))
    .catch(error => res.status(400).json({ error }));
}