-- Migration: 001_create_users_table
-- Creates the initial users table

CREATE TABLE IF NOT EXISTS users (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
