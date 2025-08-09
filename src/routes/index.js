import express from 'express';
import { noteRoutes } from './noteRoutes.js';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Mount note routes
router.use('/notes', noteRoutes);

export { router as apiRoutes };
