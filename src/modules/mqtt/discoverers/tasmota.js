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
            var device = await Device.findOne({
                where : {
                    mac : jsonBody.StatusNET.Mac
                }
            });

            if (null === device) {
                device = Device.build();
            }

            //console.log(jsonBody);

            device.set({
                name : jsonBody.Status.DeviceName,
                description : jsonBody.Status.FriendlyName.join(" "),
                mac : jsonBody.StatusNET.Mac,
                model : jsonBody.StatusFWR.Hardware
            });
            
            try {
                await device.save();    
            } catch (err) {
                console.log(err);
            }
        }

    }


}

module.exports = TasmotaDiscoverer;