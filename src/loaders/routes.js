
function setupRoutes(app) {
    
    app.get('/', require('../api/routes/main'));
    app.get('/device/edit/:deviceId', require('../api/routes/device/edit'));
    app.get('/device/post/:deviceId', require('../api/routes/device/edit'));

    const location = require('../api/routes/location/edit');

    app.get('/location', require('../api/routes/location'));
    app.get('/location/add', location.get);
    app.post('/location/add', location.post);
    app.get('/location/edit/:locationId', location.get);
    app.get('/location/delete/:locationId', require('../api/routes/location/delete'));
    app.post('/location/edit/:locationId', location.post);
}

module.exports = setupRoutes;