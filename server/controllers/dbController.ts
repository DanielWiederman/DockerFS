import { Request, Response } from 'express';
import pool from '../db.js';
import { client } from '../mongo.js';

export const testPostgresDb = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    res.status(200).json({
      success: true,
      message: 'Postgres is alive!',
      db_time: result.rows[0].current_time,
    });
  } catch (error) {
    console.error('Postgres Database connection failed:', error);
    res.status(500).json({ success: false, error: 'Failed to connect to Postgres' });
  }
};

export const testMongoDb = async (req: Request, res: Response): Promise<void> => {
  try {
    await client.db().admin().ping();
    res.status(200).json({
      success: true,
      message: 'MongoDB is alive!',
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    res.status(500).json({ success: false, error: 'Failed to connect to MongoDB' });
  }
};