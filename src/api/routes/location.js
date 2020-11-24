const Location = require("../../models/location");

async function locationController(req, res) {

        var params = {
                locationList : await Location.find(),

        };

        if (req.query['msg']) {
                params.msg = req.query['msg'];
                params.msgtype = 'warning';
        }

        if (req.query['msgtype']) {
                params.msgtype = req.query['msgtype'];
        }
               
        res.render('location', params);
}

module.exports = locationController;