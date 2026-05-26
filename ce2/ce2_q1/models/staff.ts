import { Filter, Document } from 'mongodb';
import { db } from './db';

const collectionName = 'staff'

export class Staff {
    id: string;
    name: string;
    dept: string;

    constructor(id: string, name: string, dept_code: string) {
        this.id = id;
        this.name = name;
        this.dept = dept_code;
    }
}

export async function all(): Promise<Staff[]> {
    const staffs = await find({});
    return staffs;
}

export async function find(p: Filter<Document>): Promise<Staff[]> {
    try {
        if (!db) throw new Error("Database not initialized");
        const collection = db.collection(collectionName);
        const cursor = collection.find(p);
        const staffs: Staff[] = [];
        while (await cursor.hasNext()) {
            const dbobj = await cursor.next();
            if (dbobj) {
                staffs.push(new Staff(
                    dbobj.id as string,
                    dbobj.name as string,
                    dbobj.dept as string
                ));
            }
        }
        return staffs;
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    } 
}

export async function insertMany(staffs: Staff[]): Promise<void> {
    try {
        if (!db) throw new Error("Database not initialized");
        const collection = db.collection(collectionName);
        await collection.insertMany(staffs);
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    } 
}