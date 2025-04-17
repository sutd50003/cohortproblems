const mysql = require('mysql2')


let pool = mysql
  .createPool({
    host: "localhost",
    user: "pichu",
    database: "ce8q1",
    password: "pikaP!",
    connectionLimit: 10,
  })
  .promise();


async function cleanup() {
    await pool.end();
}

module.exports = {pool, cleanup};