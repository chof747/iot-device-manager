const express = require('./express');
const routes = require('./routes');
const dotenv = require('./dotenv');
const db = require('./db');
const mqtt = require('./mqtt');

function bootstrap(app)  {

    express(app);
    routes(app);
    dotenv(app);
    db(app);
    mqtt(app);
}

module.exports = bootstrap;