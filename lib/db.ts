import { Pool, QueryResult, QueryResultRow } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres.ovurdxjnnyliefzsecem:kVRtzHm339f2W2@aws-1-eu-central-1.pooler.supabase.com:5432/postgres';

// Ensure IPv4 pooler is used if direct host without IPv6 routing is passed
let finalConnectionString = connectionString;
if (connectionString.includes('db.ovurdxjnnyliefzsecem.supabase.co')) {
  finalConnectionString = connectionString.replace(
    'postgres:kVRtzHm339f2W2@db.ovurdxjnnyliefzsecem.supabase.co:5432/postgres',
    'postgres.ovurdxjnnyliefzsecem:kVRtzHm339f2W2@aws-1-eu-central-1.pooler.supabase.com:5432/postgres'
  );
}

const pool = new Pool({
  connectionString: finalConnectionString,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  console.error('[DB Pool Error]', err);
});

export async function query<T extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
  const start = Date.now();
  try {
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development') {
      console.log('[DB Query]', { text: text.substring(0, 60), duration: `${duration}ms`, rows: res.rowCount });
    }
    return res;
  } catch (error) {
    console.error('[DB Query Error]', error, { text, params });
    throw error;
  }
}

export default pool;
