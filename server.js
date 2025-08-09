import { createApp } from './src/app.js';
import { database } from './src/config/database.js';
import { config } from './src/config/environment.js';
import { logger } from './src/utils/logger.js';

class Server {
  constructor() {
    this.app = createApp();
    this.server = null;
  }

  async start() {
    try {
      // Connect to database
      await database.connect();

      // Start server
      this.server = this.app.listen(config.port, () => {
        logger.info(`✅ Server running at http://localhost:${config.port}`);
        logger.info(`🌍 Environment: ${config.nodeEnv}`);
      });

      // Graceful shutdown
      this.setupGracefulShutdown();

    } catch (error) {
      logger.error('Failed to start server:', error);
      process.exit(1);
    }
  }

  setupGracefulShutdown() {
    const shutdown = async (signal) => {
      logger.info(`Received ${signal}. Starting graceful shutdown...`);
      
      if (this.server) {
        this.server.close(async () => {
          logger.info('HTTP server closed');
          await database.disconnect();
          logger.info('✅ Graceful shutdown completed');
          process.exit(0);
        });
      }

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error('❌ Forced shutdown');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  }
}

// Start server
const server = new Server();
server.start();
