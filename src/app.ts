import express, { Application } from 'express';
import routes from './routes';
import lineRoutes from './routes/line';
import { errorHandler } from './middlewares/errorHandler';

// Create Express server
const app: Application = express();

// Routes
app.use('/api', routes);
app.use('/api/line', lineRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;