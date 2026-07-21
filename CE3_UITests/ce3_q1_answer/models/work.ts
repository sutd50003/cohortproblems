import db from './db';

const tableName = 'work';

export class Work {
    public id: number;
    public code: string;

    constructor(id: number, code: string) {
        this.id = id;
        this.code = code;
    }
}

export async function sync() {
    try {
        await db.pool.query(`
        CREATE TABLE IF NOT EXISTS ${tableName} (
            id INTEGER,
            code CHAR(2),
            PRIMARY KEY (id, code),
            FOREIGN KEY (id) REFERENCES staff(id),
            FOREIGN KEY (code) REFERENCES dept(code)
        )
        `);
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * return the list of all work entries
 * @returns a list of works
 */
export async function all(): Promise<Work[]> {
    try {
        const [rows] = await db.pool.query(`
            SELECT id, code FROM ${tableName}
        `);
        const list: Work[] = [];
        for (const row of rows as any[]) {
            const work = new Work(row.id, row.code);
            list.push(work);
        }
        return list;
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * find a work object in the db
 * @param work
 * @returns a list of works (either empty or one object)
 */
export async function findOne(work: Work): Promise<Work[]> {
    try {
        const [rows] = await db.pool.query(`
            SELECT id, code FROM ${tableName} WHERE id = ? AND code = ?`, [work.id, work.code]
        );
        const list: Work[] = [];
        for (const row of rows as any[]) {
            const w = new Work(row.id, row.code);
            list.push(w);
        }
        return list;
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * return a list of work entries by staff id
 * @param staff_id
 * @returns a list of works (empty or one, since a staff can only belong to one dept)
 */
export async function findByStaffId(staff_id: number): Promise<Work[]> {
    try {
        const [rows] = await db.pool.query(`
            SELECT id, code FROM ${tableName} WHERE id = ?`, [staff_id]
        );
        const list: Work[] = [];
        for (const row of rows as any[]) {
            const work = new Work(row.id, row.code);
            list.push(work);
        }
        return list;
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * Insert a work object into the database if it does not exist
 * @param work
 */
export async function insertOne(work: Work) {
    try {
        const exists = await findOne(work);
        if (exists.length === 0) {
            await db.pool.query(`
            INSERT INTO ${tableName} (id, code) VALUES (?, ?)
            `, [work.id, work.code]);
        }
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * Insert a list of work entries
 * @param works
 */
export async function insertMany(works: Work[]) {
    for (const work of works) {
        await insertOne(work);
    }
}

/**
 * Delete a work object from the database
 * @param work
 */
export async function deleteOne(work: Work) {
    try {
        await db.pool.query(`
            DELETE FROM ${tableName} where id = ? AND code = ?`, [work.id, work.code]);
    } catch (error: any) {
        console.error("database connection failed. " + error);
        throw error;
    }
}
