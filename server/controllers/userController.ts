import { Request, Response } from 'express';
import { UserModel } from '../models/userModel.js';
import redisClient from '../redis.js';

// Single Redis Hash key that holds all users: field = user id, value = JSON
const HASH_KEY = 'users';

// ─── GET /api/users ──────────────────────────────────────────────────────────
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Check Redis Hash — returns { "1": "{...}", "2": "{...}" } or {}
    const hashMap = await redisClient.hGetAll(HASH_KEY);

    if (Object.keys(hashMap).length > 0) {
      const users = Object.values(hashMap).map((v) => JSON.parse(v));
      res.status(200).json({ success: true, source: 'cache', data: users });
      return;
    }

    // 2. Cache MISS — fetch from Postgres
    const users = await UserModel.getAll();

    // 3. Populate the Hash: each field is the user's id
    if (users.length > 0) {
      const entries: Record<string, string> = {};
      for (const user of users) {
        entries[String(user.id)] = JSON.stringify(user);
      }
      await redisClient.hSet(HASH_KEY, entries);
    }

    res.status(200).json({ success: true, source: 'db', data: users });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
};

// ─── GET /api/users/:id ───────────────────────────────────────────────────────
export const getUserById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  try {
    // 1. Check Redis Hash field
    const cached = await redisClient.hGet(HASH_KEY, String(id));
    if (cached) {
      res.status(200).json({ success: true, source: 'cache', data: JSON.parse(cached) });
      return;
    }

    // 2. Cache MISS — fetch from Postgres
    const user = await UserModel.getById(id);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    // 3. Add this user's field to the Hash
    await redisClient.hSet(HASH_KEY, String(user.id), JSON.stringify(user));

    res.status(200).json({ success: true, source: 'db', data: user });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch user' });
  }
};

// ─── POST /api/users ──────────────────────────────────────────────────────────
export const createUser = async (req: Request<{}, {}, { name: string; email: string }>, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    const user = await UserModel.create(name, email);

    // Add the new user as a field in the Hash
    await redisClient.hSet(HASH_KEY, String(user.id), JSON.stringify(user));

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.error('Failed to create user:', error);
    res.status(500).json({ success: false, error: 'Failed to create user' });
  }
};

// ─── DELETE /api/users/:id ────────────────────────────────────────────────────
export const deleteUser = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  try {
    const deleted = await UserModel.delete(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    // Remove the user's field from the Hash
    await redisClient.hDel(HASH_KEY, String(id));

    res.status(200).json({ success: true, message: `User ${id} deleted` });
  } catch (error) {
    console.error('Failed to delete user:', error);
    res.status(500).json({ success: false, error: 'Failed to delete user' });
  }
};
