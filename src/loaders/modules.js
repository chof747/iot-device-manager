const fs = require('fs');
const path = require('path');

load = function(app) {

    fs
    .readdirSync(__dirname + "/../modules")
    .forEach(file => {
        const module = require(path.join("../modules", file));
        module(app)
    });
};

module.exports = load;
