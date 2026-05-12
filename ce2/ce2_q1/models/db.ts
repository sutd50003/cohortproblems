import { MongoClient, Db } from 'mongodb';

const connection_str = 'mongodb://localhost:27017/';

const client = new MongoClient(connection_str);
const dbName = 'ce2q1'

let db: Db | null = null;

try {
    db = client.db(dbName);
} catch (error) {
    console.error("database connection failed. " + error);
}

async function cleanup(): Promise<void> {
    await client.close();
}


export { db, cleanup };