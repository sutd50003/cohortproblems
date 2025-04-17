const MongoClient = require('mongodb').MongoClient;

const connection_str = 'mongodb://localhost:27017/';

const client = new MongoClient(connection_str);
const dbName = 'ce5q3'

var db = null;

try {
    db = client.db(dbName);
} catch (error) {
    console.error("database connection failed. " + error);
}

async function cleanup() {
    await client.disconnect();
}


module.exports = { db, cleanup } ;