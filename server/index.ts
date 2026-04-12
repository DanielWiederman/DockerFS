import express, { Application, Request, Response, NextFunction } from 'express';
// import 'dotenv/config'; // Loads variables from .env
import cors from 'cors';
import pool from './db.js';

const app: Application = express();
const PORT = process.env.PORT || 4011;
app.use(cors({
  origin: 'http://localhost:5173', // מאפשר ספציפית לפרונטאנד הזה לפנות
  credentials: true
}));

// 1. Global Middleware
app.use(express.json()); // Parses incoming JSON
app.use(express.urlencoded({ extended: true }));

// 2. Health Check / Basic Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

app.get('/db-test', async (req: Request, res: Response) => {
  try {
    // השאילתה הכי פשוטה ב-SQL: תביא לי את השעה הנוכחית מהשרת
    const result = await pool.query('SELECT NOW() as current_time');
    
    res.status(200).json({ 
      success: true, 
      message: 'Postgres is alive!',
      db_time: result.rows[0].current_time 
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ success: false, error: 'Failed to connect to Postgres' });
  }
});

// 3. Catch-all for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// 4. Global Error Handler (Must have 4 arguments)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error]: ${err.message}`);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});
