import { config } from '../config/environment.js';

class Logger {
  info(message, ...args) {
    if (config.nodeEnv !== 'test') {
      console.log(`ℹ️  [INFO] ${new Date().toISOString()}: ${message}`, ...args);
    }
  }

  error(message, ...args) {
    if (config.nodeEnv !== 'test') {
      console.error(`❌ [ERROR] ${new Date().toISOString()}: ${message}`, ...args);
    }
  }

  warn(message, ...args) {
    if (config.nodeEnv !== 'test') {
      console.warn(`⚠️  [WARN] ${new Date().toISOString()}: ${message}`, ...args);
    }
  }

  debug(message, ...args) {
    if (config.nodeEnv === 'development') {
      console.debug(`🐛 [DEBUG] ${new Date().toISOString()}: ${message}`, ...args);
    }
  }
}

export const logger = new Logger();
