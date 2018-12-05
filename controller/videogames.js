const express = require('express');
const videogames = express();
const models = require('../models');

videogames.get('/', (req, res) => {
  models.Videogame.findAll().then(videogames => {
    res.locals.videogames = videogames;
    res.render('videogames/index.handlebars');
  });
});

//new
videogames.get('/new', (req, res) => {
  res.render('videogames/new.handlebars');
});

//create
videogames.post('/', (req, res) => {
  models.Videogame.findOne({ where: { model: req.body.model } }).then(preResult => {
    if (preResult) {
      return res.status(400).send({
        statusCode: 400,
        error: 'bad request',
        messege: 'Van már ilyen ID'
      });
    } else {
      models.Videogame.create({
        manufacturer: req.body.manufacturer,
        model: req.body.model
      }).then(result => {
        res.redirect('/videogames');
      });
    }
  });
});

videogames.get('/:id/', (req, res) => {
  models.Videogame.findById(req.params.id).then(videogames => {
    if (videogames === null) {
      res.status(400).send('Nincs ilyen id!');
    } else {
      res.locals.videogames = videogames;
      res.render('videogames/show.handlebars');
    }
  });
});

//edit
videogames.get('/:id/edit', (req, res) => {
  models.Videogame.findById(req.params.id).then(videogames => {
    if (videogames === null) {
      res.status(400).send('Nincs ilyen id!');
    } else {
      res.locals.videogames = videogames;
      res.render('videogames/edit.handlebars');
    }
  });
});

videogames.delete('/:id', (req, res) => {
  models.Videogame.destroy({ where: { id: req.params.id } }).then(result => {
    if (!result) {
      return res.status(400).send({
        statusCode: 400,
        error: 'bad request',
        messege: 'Nincs ilyen ID'
      });
    } else {
      res.redirect('/videogames');
    }
  });
});

videogames.put('/:id', (req, res) => {
  models.Videogame.findById(req.params.id).then(preResult => {
    if (!preResult) {
      return res.status(400).send('Nincs ilyen ID!');
    }
    models.Videogame.findOne({ where: { id: req.body.id } }).then(preResult2 => {
      if (preResult2) {
        return res.status(400).send('Már van ilyen videogame!');
      } else {
        models.Videogame.update({
          manufacturer: req.body.manufacturer,
          model: req.body.model
        },
        {
          where: { id: req.params.id }
        }).then(result => {
          res.redirect(`/videogames/${req.params.id}`);
        });
      }
    });
  });
});

module.exports = videogames;
