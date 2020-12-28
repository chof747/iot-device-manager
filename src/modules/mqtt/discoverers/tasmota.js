const BaseDiscoverer = require('./base');
const request = require('request');
const Device = require('../../../models/index').Device

class TasmotaDiscoverer extends BaseDiscoverer {

    async obtainDevice(info, callback) {
        var ip = info.StatusNET.IPAddress;

        var scope = this;
        
        //console.log(`request to: ${ip}`);
        
        request(`http://${ip}/cm?cmnd=STATUS%200`, {
            json : true
        }, (err, res, body) => {

            //console.log(body);

            scope.getInformation(body).then(
                BaseDiscoverer.prototype.obtainDevice(info, callback));

        });

    }

    async getInformation(jsonBody) {

        if (jsonBody.Status !== undefined) {
            var device = Device.build({
                name : jsonBody.Status.Topic,
                description : jsonBody.Status.DeviceName,
                mac : jsonBody.StatusNET.Mac,
                model : jsonBody.StatusFWR.Hardware
            });
    
            console.log(device);
            await device.save();    
        }

    }


}

module.exports = TasmotaDiscoverer;