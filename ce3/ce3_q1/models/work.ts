import * as db from './db';

const tableName = 'work';

export class Work {
  id: number;
  code: string;

  constructor(id: number, code: string) {
    this.id = id;
    this.code = code;
  }
}

export async function sync(): Promise<void> {
  try {
    db.pool.query(`
    CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER,
        code CHAR(2),
        PRIMARY KEY (id, code),
        FOREIGN KEY (id) REFERENCES staff(id),
        FOREIGN KEY (code) REFERENCES dept(code)
    )
    `);
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

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
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

export async function findOne(work: Work): Promise<Work[]> {
  try {
    const [rows] = await db.pool.query(`
      SELECT id, code FROM ${tableName} WHERE id = ? AND code = ?`, [work.id, work.code]
    );
    const list: Work[] = [];
    for (const row of rows as any[]) {
      const work = new Work(row.id, row.code);
      list.push(work);
    }
    return list;
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

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
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

export async function insertOne(work: Work): Promise<void> {
  try {
    const exists = await findOne(work);
    if (exists.length == 0) {
      await db.pool.query(`
      INSERT INTO ${tableName} (id, code) VALUES (?, ?)
      `, [work.id, work.code]);
    }
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

export async function insertMany(works: Work[]): Promise<void> {
  for (const work of works) {
    await insertOne(work);
  }
}

export async function deleteOne(work: Work): Promise<void> {
  try {
    await db.pool.query(`
      DELETE FROM ${tableName} where id = ? AND code = ?`, [work.id, work.code]);
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}