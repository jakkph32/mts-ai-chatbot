import { ErrorRequestHandler } from 'express';
import { logger } from '../utils/logger';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
    res.status(500).json({ error: err.message });
};