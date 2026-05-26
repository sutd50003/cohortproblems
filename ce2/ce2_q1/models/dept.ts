import { db } from './db';
import { Filter, Document } from 'mongodb';

const collectionName = 'dept'

export class Dept {
    code: string;

    constructor(code: string) {
        this.code = code;
    }
}

export async function all(): Promise<Dept[]> {
    const depts = await find({});
    return depts;
}

export async function find(p: Filter<Document>): Promise<Dept[]> {
    try {
        if (!db) throw new Error("Database not initialized");
        const collection = db.collection(collectionName);
        const cursor = collection.find(p);
        const depts: Dept[] = [];
        while (await cursor.hasNext()) {
            const dbobj = await cursor.next();
            if (dbobj) {
                const dept = new Dept(dbobj.code as string);
                depts.push(dept);
            }
        }
        return depts;
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    } 
}

export async function insertMany(depts: Dept[]): Promise<void> {
    try {
        if (!db) throw new Error("Database not initialized");
        const collection = db.collection(collectionName);
        await collection.insertMany(depts);
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    } 
}