const mongoose = require('mongoose');
//const { mongo } = require('mongoose');
//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;


before(function(done)  {
    mongoose.connect('mongodb://localhost:27017/iot-test',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    mongoose.connection
    .once('open', () => {
        done();
    })
    .on('error', (error) => {
        console.warn('Error : ',error);
    });
});

after(function(done)  {
    return mongoose.disconnect(done);
});

