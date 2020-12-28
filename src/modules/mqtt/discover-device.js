const Device = require('../../models/index').Device
const discoveryFactory = require('./discoverers');

class DiscoverDevice {
    _mqttClient = null
    _currentDevice = null;
    _investigating = false;


    constructor(client) {

        this._currentDevice = null;
        this._investigating = false;
        this._mqttClient = client;
    }

    checkDeviceMessage(topic, message) {

    //    console.log("Current Device = " + this._currentDevice);
    //    console.log("Investigating  = " + this._investigating);

        var match = topic.match(/(stat|tele)\/(.*)\/(.*)/);

        if (match) {
            if (this._currentDevice === null) {
    //            console.log(match[2] + " - " + match[3]);
                Device.findByName(match[2]).then(function (devices) {

                    if (devices.length == 0) {
                        this._currentDevice = match[2];
                        console.log("Starting discovery for: " + this._currentDevice);
                        this.requestDetails(match[2]);
                    } else {
                        console.log("Device already known: " + match[2]);
                    }
                }.bind(this));
            } else {
                if ((match[3] == 'STATUS5')  && (!this._investigating)) {
                    this.discover(match[1], message);
                }
            }
        }
    }

    async discover(name, message) {
        this._investigating = true;

        var parameters = JSON.parse(message.toString());
        var discoverer = null;

        if ("device" in parameters) {
            //todo for own devices
        } else if ("StatusNET" in parameters) {
            discoverer = discoveryFactory('tasmota');

            //todo tasmota devices
        }

        if (discoverer !== null) {
            discoverer.obtainDevice(parameters, this.closeDiscovery.bind(this));
        }

        this._analyzing = 0;
    }

    requestDetails(name) {
        this._mqttClient.publish('cmnd/' + name + '/STATUS', '5');
    }

    closeDiscovery() {
        console.log("Investigation Done for: " + this._currentDevice);
        this._currentDevice = null;
        this._investigating = false;
    }

};

module.exports = DiscoverDevice;