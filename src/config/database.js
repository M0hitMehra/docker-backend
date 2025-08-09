import mongoose from 'mongoose';
import { config } from './environment.js';
import { logger } from '../utils/logger.js';

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      };

      this.connection = await mongoose.connect(config.mongoUri, options);
      logger.info('✅ Connected to MongoDB', config.mongoUri);
      
      return this.connection;
    } catch (error) {
      logger.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.connection) {
      await mongoose.disconnect();
      logger.info('🔌 Disconnected from MongoDB');
    }
  }
}

export const database = new Database();
