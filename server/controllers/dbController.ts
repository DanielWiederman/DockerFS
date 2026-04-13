import { Request, Response } from 'express';
import pool from '../db.js';

export const testDb = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    res.status(200).json({
      success: true,
      message: 'Postgres is alive!',
      db_time: result.rows[0].current_time,
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ success: false, error: 'Failed to connect to Postgres' });
  }
};
