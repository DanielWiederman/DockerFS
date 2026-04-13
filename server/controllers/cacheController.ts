import { Request, Response } from 'express';
import redisClient from '../redis.js';

export const testCache = async (req: Request, res: Response): Promise<void> => {
  try {
    await redisClient.set('test_key', 'Hello from Redis 8.6.2!');
    const value = await redisClient.get('test_key');
    res.status(200).json({
      success: true,
      message: 'Redis is working flawlessly!',
      cached_value: value,
    });
  } catch (error) {
    console.error('Redis test failed:', error);
    res.status(500).json({ success: false, error: 'Failed to connect to Redis' });
  }
};
