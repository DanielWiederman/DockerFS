import { Pool } from 'pg';

// אנחנו יוצרים בריכת חיבורים. 
// ה-Pool ישאב אוטומטית את הכתובת מ-process.env.DATABASE_URL שהגדרנו בדוקר
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // הגדרות אופציונליות של סניורים:
  max: 20, // מקסימום 20 חיבורים פתוחים במקביל
  idleTimeoutMillis: 30000, // סגור חיבור שלא עשה כלום חצי דקה
  connectionTimeoutMillis: 2000, // כמה זמן לחכות לחיבור לפני שזורקים שגיאה
});

// מאזין לאירועים כדי שנדע כשהשרת עולה שהכל מחובר יפה
pool.on('connect', () => {
  console.log('📦 Connected to PostgreSQL database successfully!');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;