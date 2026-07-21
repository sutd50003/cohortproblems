import db from './db';
import * as staffModel from './staff';

const tableName = 'dept';

export class Dept {
    public code: string;
    public staffs?: any[];

    constructor(code: string) {
        this.code = code;
    }
}

export async function sync() {
    try {
        await db.pool.query(`
        CREATE TABLE IF NOT EXISTS ${tableName} (
            code CHAR(2) PRIMARY KEY
        )
        `);
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * @returns a list of all dept entries
 */
export async function all(): Promise<Dept[]> {
    try {
        const [rows] = await db.pool.query(`
            SELECT code FROM ${tableName}
        `);
        const list: Dept[] = [];
        for (const row of rows as any[]) {
            const dept = new Dept(row.code);
            list.push(dept);
        }
        return list;
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * find one dept entry by code
 * @param code
 * @param with_staffs
 * @returns a list of dept entries (either empty or one)
 */
export async function findOneByCode(code: string, with_staffs: boolean = false): Promise<Dept[]> {
    try {
        const [rows] = await db.pool.query(`
            SELECT code FROM ${tableName} WHERE code = ?`, [code]
        );
        const list: Dept[] = [];
        for (const row of rows as any[]) {
            const dept = new Dept(row.code);
            if (with_staffs) {
                const staffs = await staffModel.findByDept(dept.code);
                dept.staffs = staffs;
            }
            list.push(dept);
        }
        return list;
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * insert a dept entry if it does not exist
 * @param dept
 */
export async function insertOne(dept: Dept) {
    try {
        const exists = await findOneByCode(dept.code);
        if (exists.length === 0) {
            await db.pool.query(`
            INSERT INTO ${tableName} (code) VALUES (?)
            `, [dept.code]);
        }
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * insert a list of dept entries
 * @param depts
 */
export async function insertMany(depts: Dept[]) {
    for (const dept of depts) {
        await insertOne(dept);
    }
}

/**
 * delete a dept entry from the db
 * @param dept
 */
export async function deleteOne(dept: Dept) {
    try {
        await db.pool.query(`
            DELETE FROM ${tableName} where code = ?`, [dept.code]);
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}
