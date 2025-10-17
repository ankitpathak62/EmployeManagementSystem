const { MongoClient } = require('mongodb');

let db;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI missing in .env');
  }

  const client = new MongoClient(uri, {
    tls: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });

  try {
    await client.connect();
    db = client.db(); // Database name URI se aayega
    console.log('✅ MongoDB connected:', db.databaseName);
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw error;
  }
};

const getDB = () => {
  if (!db) throw new Error('DB not initialized. Call connectDB() first.');
  return db;
};

module.exports = { connectDB, getDB };
