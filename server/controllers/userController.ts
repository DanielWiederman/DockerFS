import { Request, Response } from 'express';
import { UserModel } from '../models/userModel.js';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.getAll();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
};

export const getUserById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await UserModel.getById(id);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch user' });
  }
};

export const createUser = async (req: Request<{}, {}, { name: string; email: string }>, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    const user = await UserModel.create(name, email);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.error('Failed to create user:', error);
    res.status(500).json({ success: false, error: 'Failed to create user' });
  }
};
