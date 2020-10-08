const Device = require('../../models/device');

class BaseDiscoverer {

    constructor() {
        
    }

    async obtainDevice(info, callback) {

        callback();

    }
}

module.exports = BaseDiscoverer;