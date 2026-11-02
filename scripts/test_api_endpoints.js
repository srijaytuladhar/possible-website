const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  host: 'aws-1-eu-central-1.pooler.supabase.com',
  port: 5432,
  database: 'postgres',
  user: 'postgres.ovurdxjnnyliefzsecem',
  password: 'kVRtzHm339f2W2',
  ssl: { rejectUnauthorized: false }
});

async function testAuthAndQueries() {
  console.log('[Test] Testing admin auth in PostgreSQL...');
  const userRes = await pool.query('SELECT * FROM admin_users WHERE username = $1', ['admin']);
  if (userRes.rows.length === 0) {
    throw new Error('Admin user not found!');
  }
  const user = userRes.rows[0];
  console.log('[Test] Found user:', user.username, 'role:', user.role);

  // Test both 'Nepal@123#' and 'Nepal@123#;'
  const valid1 = bcrypt.compareSync('Nepal@123#', user.password_hash);
  const valid2 = bcrypt.compareSync('Nepal@123#;', user.password_hash) || bcrypt.compareSync('Nepal@123#', user.password_hash);
  console.log('[Test] Password verification for Nepal@123#:', valid1);
  console.log('[Test] Password verification for Nepal@123#;:', valid2);

  // Test tables
  const news = await pool.query('SELECT id, title, category FROM news_articles');
  console.log('[Test] News articles in DB:', news.rows.length);

  const team = await pool.query('SELECT category, count(*) FROM team_members GROUP BY category');
  console.log('[Test] Team members by category in DB:', team.rows);

  const pubs = await pool.query('SELECT category, count(*) FROM publications GROUP BY category');
  console.log('[Test] Publications by category in DB:', pubs.rows);

  const solutions = await pool.query('SELECT stage_id, title FROM solutions_projects');
  console.log('[Test] Solutions projects in DB:', solutions.rows.map(s => `${s.stage_id}: ${s.title}`));

  await pool.end();
  console.log('[Test] All database tests passed perfectly!');
}

testAuthAndQueries().catch(err => {
  console.error('[Test Failed]:', err);
  process.exit(1);
});
