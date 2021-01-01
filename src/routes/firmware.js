const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

var router = express.Router();
const { body, validationResult } = require("express-validator");
const bodyParser = require('body-parser');

//Models needed
var Firmware = require('../models/index').Firmware;
var upload = multer({
  storage : multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, process.env.FIRMWARE_STAGE);
    },
    filename : function(res,file,cb) {
      cb(null, file.originalname);
    }
  })
});

function checkExtension(filename)
{
  if('bin' == path.extname(filename))
  {
    return 'bin';
  }
  else 
  {
    var components = filename.split('.');

    if ('gz' == components.pop())
    {
      if ('bin' ==  components.pop())
      {
        return 'bin.gz';
      }
      else 
      {
        return false;
      }
    }
    else
    {
      return false;
    }
  }
}

const controller = {

  list: async function (req, res)
  //***************************************************************************
  {
    var firmwares = await Firmware.findAll();
    res.render('firmware/index', {
      firmwares : firmwares
    });
  },

  add : async function (req, res) 
  //***************************************************************************
  {
    res.render('firmware/add', {
      firmwares : await Firmware.findAll()
    });    
  },

  upload : [ 
    bodyParser.urlencoded({ extended: false }),
    async (req, res) =>
  //***************************************************************************
  {
    var filename = req.file.originalname;
    if (extension = checkExtension(filename))
    {
      var firmware = null;
      if ((null !== req.body.firmware) && (0 !== req.body.firmware * 1) && (!isNaN(req.body.firmware * 1)))
      {
        firmware = await Firmware.findByPk(req.body.firmware * 1);
      }
      else 
      {
        firmware = Firmware.build();
        firmware.name = filename.replace(`.${extension}`, '');
        firmware.description = req.body.description;
      }

      firmware.versionAvailable = req.body.versionAvailable;

      firmware.url = path.join(process.env.FIRMWARE_STORAGE, 
        `${firmware.name}_${firmware.versionAvailable}.${extension}`); 
      fs.copyFileSync(req.file.path, firmware.url);
      
      await firmware.save();

      res.redirect('/firmware');
    }
    else 
    {
      //render an error message that the file is not a firmwar
      console.error(`${filename} is not a firmware package.`);
      res.redirect('/firmware/add');
    }

  }],

  edit: async function (req, res)
  //***************************************************************************
  {
    var firmware = null;
    var create = false;

    if (undefined !== req.params.id) {
      firmware = await Firmware.findByPk(req.params.id);
    } else {
      firmware = Firmware.build();
      create = true;
    }
    res.render('firmware/edit', {
      firmware: firmware,
      firmwareid: req.params.id,
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
        firmware = await Firmware.findByPk(req.body.id);
      } else {
        firmware = Firmware.build();
      }

      //update fields here
      firmware.name = req.body.name;
      firmware.description = req.body.description;
      firmware.url = req.body.url;
      firmware.versionAvailable = req.body.versionAvailable;

      //error Handling
      if (!errors.isEmpty()) {
        res.render('firmware/edit', {
          firmware: firmware,
          errors: errors
        });
      } else {
        await firmware.save();
        res.redirect('/firmware');
      }


    }
  ],

  delete : async function(req, res) {
  //****************************************************************************
    firmware = await Firmware.findByPk(req.params.id);
    if (null !== firmware) {
      await firmware.destroy();
    }
    res.redirect('/firmware');
  }

};


/* GET users listing. */
router.get('/', controller.list);

//Displaying the form for editing the User model
router.get('/edit/:id', controller.edit);

//Create a new user (via editing)
router.get('/add', controller.add);

//Handling user creation
router.post('/add', upload.single('firmwareupload') ,controller.upload);

//Handling user update
router.post('/edit/:id', controller.update);

//Handling user delete
router.get('/delete/:id', controller.delete);

module.exports = router;
