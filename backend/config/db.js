const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    if (process.env.NODE_ENV === 'development') {
        try {
            const conn = await mongoose.connect(mongoUri);
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            return;
        } catch (err) {
            console.warn('Local MongoDB not found, starting memory server...');
            const mongoServer = await MongoMemoryServer.create();
            mongoUri = mongoServer.getUri();
        }
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
