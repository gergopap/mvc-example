const express = require('express');
const clocks = express();
const models = require('../models');
const Sequelize = require('sequelize');

//index
clocks.get('/', (req, res) => {
  models.Clock.findAll().then(clocks => {
    res.locals.clocks = clocks;
    res.render('clocks/index.handlebars');
  });
});

//edit
clocks.get('/:id/edit', (req, res) => {
  models.Clock.findById(req.params.id).then(clock => {
    if (!clock) {
      return res.status(400).send({
        statusCode: 400,
        error: 'bad request',
        messege: 'not found'
      });
    } else {
      res.locals.clock = clock;
      res.render('clocks/edit.handlebars');
    }
  });
});

//show
clocks.get('/:id', (req, res) => {
  models.Clock.findById(req.params.id).then(clock => {
    if (!clock) {
      return res.status(400).send({
        statusCode: 400,
        error: 'bad request',
        messege: 'not found'
      });
    } else {
      res.locals.clock = clock;
      res.render('clocks/show.handlebars');
    }
  });
});

//new
clocks.post('/new', (req, res) => {
  models.Clock.findOne({ where: { model: req.body.model } }).then(result => {
    if (result) {
      return res.status(400).send({
        statusCode: 400,
        error: 'bad request',
        messege: 'Van már ilyen'
      });
    } else {
      models.Clock.create({
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        type: req.body.type
      }).then(clock => {
        res.locals.clock = clock;
        res.render('clocks/new.handlebars');
      });
    }
  });
});



clocks.post('/', (req, res) => {
  models.Clock.findOne({ where: { model: req.body.model } }).then(result => {
    if (result) {
      return res.status(400).send({
        statusCode: 400,
        error: 'bad request',
        messege: 'Van már ilyen'
      });
    } else {
      models.Clock.create({
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        type: req.body.type
      }).then(result => {
        res.json(result);
      });
    }
  });
});

clocks.delete('/:id', (req, res) => {
  models.Clock.destroy({ where: { id: req.params.id } }).then(result => {
    if (!result) {
      return res.status(400).send({
        statusCode: 400,
        error: 'bad request',
        messege: 'not found'
      });
    } else {
      res.json(result);
    }
  });
});

clocks.put('/:id', (req, res) => {
  models.Clock.findById(req.params.id).then(result => {
    if (result) {
      models.Clock.update(
        req.body,
        { where: { id: req.params.id } }
      ).then(udresult => {
        res.redirect(`/clocks/${req.params.id}`);
      });
    } else {
      return res.status(400).send({
        statusCode: 400,
        error: 'bad request',
        messege: 'not found'
      });
    }
  });
});

module.exports = clocks;
