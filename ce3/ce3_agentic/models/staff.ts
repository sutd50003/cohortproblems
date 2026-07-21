import * as db from './db';
import * as workModel from './work';

const tableName = 'staff';

export class Staff {
  id: number | undefined;
  name: string;
  code: string | undefined;

  constructor(id: number | undefined, name: string, code: string | undefined) {
    this.id = id;
    this.name = name;
    this.code = code;
  }

  static newStaff(name: string, code: string): Staff {
    return new Staff(undefined, name, code);
  }
}

export async function sync(): Promise<void> {
  try {
    db.pool.query(`
    CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) UNIQUE
    )
    `);
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

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
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

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
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

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
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

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
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

export async function insertOne(staff: Staff): Promise<void> {
  try {
    const exists = await findOneByName(staff.name);
    if (exists.length == 0) {
      await db.pool.query(`
      INSERT INTO ${tableName} (name) VALUES (?)
      `, [staff.name]);
      const staffs_with_id = await findOneByName(staff.name);
      if (staffs_with_id.length > 0) {
        const work = new workModel.Work(staffs_with_id[0].id as number, staff.code as string);
        await workModel.insertOne(work);
      }
    }
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

export async function insertMany(staffs: Staff[]): Promise<void> {
  for (const staff of staffs) {
    await insertOne(staff);
  }
}

export async function deleteOne(staff: Staff): Promise<void> {
  try {
    await db.pool.query(`DELETE FROM work where id = ?`, [staff.id]);
    await db.pool.query(`DELETE FROM ${tableName} where id = ?`, [staff.id]);
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}