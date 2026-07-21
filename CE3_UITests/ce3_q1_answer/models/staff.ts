import db from './db';
import * as workModel from './work';

const tableName = 'staff';

export class Staff {
    public id?: number;
    public name: string;
    public code?: string;

    constructor(id: number | undefined, name: string, code: string | undefined) {
        this.id = id;
        this.name = name;
        this.code = code;
    }

    public static newStaff(name: string, code: string): Staff {
        return new Staff(undefined, name, code);
    }
}

export async function sync() {
    try {
        await db.pool.query(`
        CREATE TABLE IF NOT EXISTS ${tableName} (
            id INTEGER AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) UNIQUE
        )
        `);
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * return all staffs in the db, ignoring the dept field
 * @returns a list of staffs
 */
export async function all(): Promise<Staff[]> {
    try {
        const [rows] = await db.pool.query(`
            SELECT ${tableName}.id, ${tableName}.name, work.code FROM ${tableName}
            LEFT JOIN work ON ${tableName}.id = work.id
        `);
        const list: Staff[] = [];
        for (const row of rows as any[]) {
            const staff = new Staff(row.id, row.name, row.code);
            list.push(staff);
        }
        return list;
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * return one staff in a list if exists by its staff id
 * @param id the staff id
 * @returns a list of staffs (either empty or one staff)
 */
export async function findOneById(id: number): Promise<Staff[]> {
    try {
        const [rows] = await db.pool.query(`
            SELECT ${tableName}.id, ${tableName}.name, work.code FROM ${tableName}
            LEFT JOIN work ON ${tableName}.id = work.id
            WHERE ${tableName}.id = ?`, [id]
        );
        const list: Staff[] = [];
        for (const row of rows as any[]) {
            const staff = new Staff(row.id, row.name, row.code);
            list.push(staff);
        }
        return list;
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * return one staff in a list if exists by its staff name
 * @param name the staff's name
 * @returns a list of staffs (either empty or one staff)
 */
export async function findOneByName(name: string): Promise<Staff[]> {
    try {
        const [rows] = await db.pool.query(`
            SELECT ${tableName}.id, ${tableName}.name, work.code FROM ${tableName}
            LEFT JOIN work ON ${tableName}.id = work.id
            WHERE ${tableName}.name = ?`, [name]
        );
        const list: Staff[] = [];
        for (const row of rows as any[]) {
            const staff = new Staff(row.id, row.name, row.code);
            list.push(staff);
        }
        return list;
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * Return a list of staffs by the given dept code
 * @param code dept code
 * @returns a list of staffs
 */
export async function findByDept(code: string): Promise<Staff[]> {
    try {
        const [rows] = await db.pool.query(`
        SELECT ${tableName}.id, ${tableName}.name, work.code FROM ${tableName}
        INNER JOIN work ON ${tableName}.id = work.id AND work.code = ?`, [code]
        );
        const list: Staff[] = [];
        for (const row of rows as any[]) {
            const staff = new Staff(row.id, row.name, row.code);
            list.push(staff);
        }
        return list;
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * insert the given staff object into the db if it does not exist
 * @param staff
 */
export async function insertOne(staff: Staff) {
    try {
        const exists = await findOneByName(staff.name);
        if (exists.length === 0) {
            await db.pool.query(`
            INSERT INTO ${tableName} (name) VALUES (?)
            `, [staff.name]);
            const staffs_with_id = await findOneByName(staff.name);
            if (staffs_with_id.length > 0) {
                const work = new workModel.Work(staffs_with_id[0].id!, staff.code!);
                await workModel.insertOne(work);
            }
        }
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * Insert a list of staffs
 * @param staffs
 */
export async function insertMany(staffs: Staff[]) {
    for (const s of staffs) {
        await insertOne(s);
    }
}

/**
 * Delete the staff from the db
 * @param staff
 */
export async function deleteOne(staff: Staff) {
    try {
        await db.pool.query(`DELETE FROM work where id = ?`, [staff.id]);
        await db.pool.query(`DELETE FROM ${tableName} where id = ?`, [staff.id]);
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}
