const Device = require("../../../models/device");

async function edtiDeviceController(req, res) {

    var deviceId = req.params['deviceId'];
    var device = await Device.findById(deviceId);
       
    res.render('device/edit', { 
        device : device
    });
}

module.exports = edtiDeviceController;