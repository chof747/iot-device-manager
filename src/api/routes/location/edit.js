const Location = require("../../../models/location");
const { body,validationResult } = require("express-validator");
const bodyParser = require('body-parser');

controller = {

    get : async function (req, res) {

        var locationId = req.params['locationId'];
        var location = (undefined === locationId) 
            ? undefined 
            : await Location.findById(locationId);
        
        res.render('location/edit', { 
            location : location,
            create : (undefined ===location) ? true : false
        });
    },

    post : [
        bodyParser.urlencoded({ extended: false }), 
        body('name', 'Location name required').isLength({ min: 1 }).trim().escape(),
        async (req, res, next) => {
            const errors = validationResult(req);
            var location = null;

            if ('' !== req.body.id) {
                location = await Location.findById(req.body.id);
            } else {
                location = new Location();
            }

            location.name = req.body.name;
            location.description = req.body.description;
            

            if (!errors.isEmpty()) {
                res.render('location/edit', {
                    location : location, 
                    errors: error
                });
            } else {
                await location.save();
                res.redirect('/location');
            }
        }
    ]
}

module.exports = controller;