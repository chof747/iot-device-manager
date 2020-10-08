const express = require('express');
const app = express();

require('./loaders')(app);


module.exports=app;