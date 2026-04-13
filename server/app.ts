import express, { Application } from 'express';
import cors from 'cors';
import healthRoutes from './routes/healthRoutes.js';
import cacheRoutes from './routes/cacheRoutes.js';
import dbRoutes from './routes/dbRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app: Application = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', healthRoutes);
app.use('/', cacheRoutes);
app.use('/', dbRoutes);
app.use('/api', userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
