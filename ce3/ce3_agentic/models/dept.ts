import * as db from './db';
import * as workModel from './work';
import * as staffModel from './staff';

const tableName = 'dept';

export class Dept {
  code: string;
  staffs?: any;

  constructor(code: string) {
    this.code = code;
  }
}

export async function sync(): Promise<void> {
  try {
    db.pool.query(`
    CREATE TABLE IF NOT EXISTS ${tableName} (
        code CHAR(2) PRIMARY KEY
    )
    `);
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

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
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

export async function findOneByCode(code: string, with_staffs: boolean = false): Promise<Dept[]> {
  try {
    const [rows] = await db.pool.query(`
      SELECT code FROM ${tableName} WHERE code = ?`, [code]
    );
    const list: Dept[] = [];
    for (const row of rows as any[]) {
      const dept = new Dept(row.code);
      if (with_staffs) {
        const staffs = staffModel.findByDept(dept.code);
        dept.staffs = staffs as any;
      }
      list.push(dept);
    }
    return list;
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

export async function insertOne(dept: Dept): Promise<void> {
  try {
    const exists = await findOneByCode(dept.code);
    if (exists.length == 0) {
      await db.pool.query(`
      INSERT INTO ${tableName} (code) VALUES (?)
      `, [dept.code]);
    }
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

export async function insertMany(depts: Dept[]): Promise<void> {
  for (const dept of depts) {
    await insertOne(dept);
  }
}

export async function deleteOne(dept: Dept): Promise<void> {
  try {
    await db.pool.query(`
      DELETE FROM ${tableName} where code = ?`, [dept.code]);
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}