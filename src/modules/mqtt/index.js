const mqtt = require('mqtt');
const DiscoverDevice = require('./discover-device');

mqttClient = function(app) {

    var client  = mqtt.connect({
        host : process.env.MQTT_BROKER,
        port : 1883,
        username : process.env.MQTT_USER,
        password : process.env.MQTT_PASSWORD
    });

    var discoverer = new DiscoverDevice(client);

    client.on('connect', function() {
        client.subscribe('stat/#', function(err) {
            if (err) {
                console.error('Cannot subscribe to status messages: ' + err);
            }
        });
        client.subscribe('tele/#', function(err) {
            if (err) {
                console.error('Cannot subscribe to status messages: ' + err);
            }
        });
        console.log("MQTT Ready");
    });

    client.on('message', discoverer.checkDeviceMessage.bind(discoverer));

    client.on('error', function(err) {
        console.error("Cannot Connect to MQTT Server")
    })

    app.set('mqttclient', client);

    return client;
};

module.exports = mqttClient;
