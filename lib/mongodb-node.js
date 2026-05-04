const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://admin:admin@cluster0.qj8jn.mongodb.net/badol_tyre?retryWrites=true&w=majority";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
}

module.exports = { connectDB };
