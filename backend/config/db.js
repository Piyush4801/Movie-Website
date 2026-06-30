const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  const conn = await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
