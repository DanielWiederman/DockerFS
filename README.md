# 🚀 DockerFS - Production-Ready Fullstack Boilerplate

A complete, containerized Fullstack development environment designed for rapid scaffolding, technical interviews, and scalable MVP creation.

This boilerplate eliminates the hours typically spent on configuring CORS, hot-reloading, database connections, and cache strategies. Just clone, build, and start coding.

## 🏗️ Architecture & Tech Stack

This project uses a modern, decoupled architecture wrapped entirely in Docker Compose.

* **Frontend:** React (powered by Vite) - Port `5173`
* **Backend:** Node.js / Express (powered by `tsx` for native TypeScript execution & hot-reload) - Port `5000`
* **Database:** PostgreSQL (v15 Alpine) - Port `5432`
* **Cache:** Redis (v8.6.2 Alpine) - Port `6379`

## ✨ Key Features

* **Zero-Setup Hot Reload:** Both the React frontend and Node backend hot-reload instantly upon saving files.
* **Production-Grade DB Connection:** Uses a Connection Pool for PostgreSQL to handle multiple concurrent requests efficiently.
* **Cache-Aside Pattern Built-in:** Redis is fully integrated and configured with `appendonly yes` (AOF) for data persistence.
* **Data Persistence:** Database volumes are securely managed via Docker Named Volumes (`postgres_data`, `redis_data`) bypassing OS permission conflicts.

## 📁 Project Structure

```text
DockerFS/
├── docker-compose.yml
├── front/                 # React frontend (Vite)
│   ├── src/
│   └── Dockerfile
└── server/                # Node.js backend
    ├── src/
    │   ├── controllers/   # Business logic & Caching
    │   ├── models/        # DB queries (Postgres)
    │   ├── routes/        # Express routers
    │   ├── db.ts          # Postgres Pool configuration
    │   ├── redis.ts       # Redis client configuration
    │   └── index.ts       # Entry point
    └── Dockerfile
