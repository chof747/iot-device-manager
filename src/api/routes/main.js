const Device = require("../../models/device");

async function mainController(req, res) {
       
        res.render('index', {
                deviceList : await Device.find()
        });
}

module.exports = mainController;