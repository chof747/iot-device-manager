const mongoose=require('mongoose');

console.log(process.env.DB_URL);

const db = () => {
    return mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
  };

module.exports = db