const express = require('express');
const videogames = express();
const models = require('../models');

videogames.get('/', (req, res) => {
  models.Clock.findall().then(videogames => {
    res.json(videogames);
  });
});

videogames.get('/:id', (req, res) => {
  models.Clock.findById(req.params.id).then(videogames => {
    res.json(videogames);
  });
});

module.exports = videogames;
