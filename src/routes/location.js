const express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const bodyParser = require('body-parser');

//Models needed
var Location = require('../models/index').Location;

const controller = {

  list: async function (req, res)
  //***************************************************************************
  {
    var locations = await Location.findAll();
    res.render('location/index', {
      locations : locations
    });
  },

  edit: async function (req, res)
  //***************************************************************************
  {
    var location = null;
    var create = false;

    if (undefined !== req.params.id) {
      location = await Location.findByPk(req.params.id);
    } else {
      location = Location.build();
      create = true;
    }
    res.render('location/edit', {
      location: location,
      locationid: req.params.id,
      create : create
    });
  },

  update: [
    bodyParser.urlencoded({ extended: false }),
    body('name', 'Name is required').isLength({ min: 1 }).trim().escape(),
    //add additional validations here
    async (req, res) => {
      //****************************************************************************
      const errors = validationResult(req);
      var user = null;

      if ('' !== req.body.id) {
        location = await Location.findByPk(req.body.id);
      } else {
        location = Location.build();
      }

      //update fields here
      location.name = req.body.name;
      location.description = req.body.description;

      //error Handling
      if (!errors.isEmpty()) {
        res.render('location/edit', {
          location: location,
          errors: errors
        });
      } else {
        await location.save();
        res.redirect('/location');
      }


    }
  ],

  delete : async function(req, res) {
  //****************************************************************************
    user = await User.findByPk(req.params.id);
    if (null !== user) {
      await user.destroy();
    }
    controller.list(req, res);
  }

};


/* GET users listing. */
router.get('/', controller.list);

//Displaying the form for editing the User model
router.get('/edit/:id', controller.edit);

//Create a new user (via editing)
router.get('/add', controller.edit);

//Handling user creation
router.post('/add', controller.update);

//Handling user update
router.post('/edit/:id', controller.update);

//Handling user delete
router.get('/delete/:id', controller.delete);

module.exports = router;
