import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: "localhost",
  user: "pichu",
  database: "ce3q1",
  password: "pikaP!",
  connectionLimit: 10,
});

async function cleanup(): Promise<void> {
  await pool.end();
}

export { pool, cleanup };