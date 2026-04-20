import { MongoClient, Db } from 'mongodb';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error('MONGODB_URL environment variable is not set');
}

export const client = new MongoClient(MONGODB_URL);

export let db: Db;

export const connectMongo = async (): Promise<void> => {
  await client.connect();
  db = client.db();
  console.log('🍃 Connected to MongoDB successfully!');
};
