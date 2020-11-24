const Device = require("../../../models/device");
const Location = require("../../../models/location");

async function edtiDeviceController(req, res) {

    var deviceId = req.params['deviceId'];
    var device = await Device.findById(deviceId);
    var locations = await Location.find();
       
    res.render('device/edit', { 
        device : device,
        locations: locations
    });
}

module.exports = edtiDeviceController;