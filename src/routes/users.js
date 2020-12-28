const express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const bodyParser = require('body-parser');

//Models needed
var User = require('../models/index').User;

const controller = {

  list: async function (req, res)
  //***************************************************************************
  {
    var users = await User.findAll();
    res.render('users/index', {
      users : users
    });
  },

  edit: async function (req, res)
  //***************************************************************************
  {
    var user = null;
    var create = false;

    if (undefined !== req.params.id) {
      user = await User.findByPk(req.params.id);
    } else {
      user = User.build();
      create = true;
    }
    res.render('users/edit', {
      user: user,
      userid: req.params.userId,
      create : create
    });
  },

  update: [
    bodyParser.urlencoded({ extended: false }),
    body('firstName', 'First name is required').isLength({ min: 1 }).trim().escape(),
    //add additional validations here
    async (req, res) => {
      //****************************************************************************
      const errors = validationResult(req);
      var user = null;

      if ('' !== req.body.id) {
        user = await User.findByPk(req.body.id);
      } else {
        user = User.build();
      }

      //update fields here
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;

      //error Handling
      if (!errors.isEmpty()) {
        res.render('users/edit', {
          user: user,
          errors: errors
        });
      } else {
        await user.save();
        controller.list(req, res);
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
