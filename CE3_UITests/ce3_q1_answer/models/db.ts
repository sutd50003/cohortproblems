import mysql from 'mysql2';
import { Pool } from 'mysql2/promise';

const pool: Pool = mysql
  .createPool({
    host: "localhost",
    user: "pichu",
    database: "ce3q1",
    password: "pikaP!",
    connectionLimit: 10,
  })
  .promise();

async function cleanup() {
    await pool.end();
}

export default { pool, cleanup };
