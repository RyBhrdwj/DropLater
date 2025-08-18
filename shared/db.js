const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Database!");
  } catch (err) {
    console.log("Connection to Database Failed!", err);
  }
}

module.exports = connectDatabase;