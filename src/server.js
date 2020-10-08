const http = require('http');
const app = require('./app');
//const config = require("./config");
 
const port = process.env.PORT || 80;
 
const server = http.createServer(app);
 
server.listen(port);