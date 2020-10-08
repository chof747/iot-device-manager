const express = require('express');
const path =  require('path');


function expressLodader(app) {

    //app.engine('pug', require('pug').__express)
    app.set('view engine', 'pug')
    app.set('views', path.join(__dirname, '..', 'views'));

    app.use(express.static(path.join(__dirname, '..' , 'public')));
}

module.exports = expressLodader;