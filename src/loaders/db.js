const mongoose=require('mongoose');

const db = () => {
    return mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
  };

module.exports = db