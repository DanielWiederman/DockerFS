import { createClient } from 'redis';

// הלקוח ישאב אוטומטית את הכתובת והסיסמה מתוך process.env.REDIS_URL
const redisClient = createClient({
  url: process.env.REDIS_URL || ""
});

// מאזינים לאירועים כדי לראות בלוגים מתי הוא מתחבר
redisClient.on('error', (err) => console.log('❌ Redis Client Error:', err));
redisClient.on('connect', () => console.log('🚀 Connected to Redis successfully!'));

// מתחברים בפועל
redisClient.connect().catch(console.error);

export default redisClient;