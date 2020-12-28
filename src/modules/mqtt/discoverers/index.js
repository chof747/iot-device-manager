const TasmotaDiscoverer = require('./tasmota');

factory = function(type) {
    if (type == 'tasmota') {
        return new TasmotaDiscoverer();
    }
    else {
        return null;
    }
}

module.exports = factory;