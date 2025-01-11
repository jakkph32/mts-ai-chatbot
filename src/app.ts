import express, { Application } from 'express';
import routes from './routes';
import lineRoutes from './routes/line';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();

app.use('/api', routes);
app.use('/api/line', lineRoutes);

app.use(errorHandler);

export default app;