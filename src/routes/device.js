const express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const bodyParser = require('body-parser');

//Models needed
var Device = require('../models/index').Device;
var Location = require('../models/index').Location;

const controller = {

  list: async function (req, res)
  //***************************************************************************
  {
    var devices = await Device.findAll({
      include : "Location"
    });
    console.log(devices);
    res.render('device/index', {
      devices : devices
    });
  },

  edit: async function (req, res)
  //***************************************************************************
  {
    var device = null;
    var create = false;

    locations = await Location.findAll();

    if (undefined !== req.params.id) {
      device = await Device.findByPk(req.params.id, {
        include : Location
      });
    } else {
      device = Device.build();
      create = true;
    }
    res.render('device/edit', {
      device: device,
      deviceid: req.params.id,
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
        device = await Device.findByPk(req.body.id);
      } else {
        device = Device.build();
      }

      //update fields here
      device.name = req.body.name;
      device.mac = req.body.mac;
      device.model = req.body.model;
      device.description = req.body.description;
      device.setLocation(req.body.location*1);

      //error Handling
      if (!errors.isEmpty()) {
        res.render('device/edit', {
          device: device,
          errors: errors
        });
      } else {
        await device.save();
        res.redirect('/device');
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
