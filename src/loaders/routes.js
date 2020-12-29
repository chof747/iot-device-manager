const fs = require('fs');
const path = require('path');

load = function(app) {

    fs
    .readdirSync(__dirname + "/../routes")
    .forEach(file => {
        const route = require(path.join("../routes", file));
        
        urlpath = path.basename(file, ".js");
        urlpath = (urlpath == "index") ? '' : urlpath;
        app.use(`/${urlpath}`, route);

    });
};

module.exports = load;
