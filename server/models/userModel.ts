import pool from '../db.js';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const UserModel = {
  async getAll(): Promise<User[]> {
    const result = await pool.query<User>(
      'SELECT id, name, email FROM users ORDER BY id ASC'
    );
    return result.rows;
  },

  async getById(id: number): Promise<User | null> {
    const result = await pool.query<User>(
      'SELECT id, name, email FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] ?? null;
  },

  async create(name: string, email: string): Promise<User> {
    const result = await pool.query<User>(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email',
      [name, email]
    );

    if (!result.rows.length) {
      throw new Error('Failed to create user');
    }

    return result.rows[0] as User;
  },

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    );
    return (result.rowCount ?? 0) > 0;
  },
};
