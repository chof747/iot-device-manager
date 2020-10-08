
function setupRoutes(app) {
    
    app.get('/', require('../api/routes/main'));
}

module.exports = setupRoutes;