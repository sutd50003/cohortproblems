const db = require('./db.js');


const tableName = 'work';


class Work {
    constructor(id, code) {
        this.id = id; // staff id 
        this.code = code; // deptartment code
    }
}


async function sync() {
    try {
        db.pool.query(`
        CREATE TABLE IF NOT EXISTS ${tableName} (
            id INTEGER,
            code CHAR(2),
            PRIMARY KEY (id, code),
            FOREIGN KEY (id) REFERENCES staff(id),
            FOREIGN KEY (code) REFERENCES dept(code)        )
        `);
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}
/**
 * return the list of all work entries
 * @returns a list of works
 */
async function all() {
    try {
        
        const [rows, fieldDefs] = await db.pool.query(`
            SELECT id, code FROM ${tableName}
        `);
        var list = [];
        for (let row of rows) {
            let work = new Work(row.id, row.code);
            list.push(work);
        }
        return list;
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * find a work object in the db
 * @param {Work} work 
 * @returns a list of works (either empty or one object)
 */
async function findOne(work) {
    try {
        const [rows, fieldDefs] = await db.pool.query(`
            SELECT id, code FROM ${tableName} WHERE id = ? AND code = ?`, [work.id, work.code]
        );
        var list = []
        for (let row of rows) {
            let work = new Work(row.id, row.code);
            list.push(work);
        }
        return list;
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}


/**
 * return a list of work entries by staff id
 * @param {int} staff_id 
 * @returns a list of works (empty or one, since a staff can only belong to one dept)
 */
async function findByStaffId(staff_id) {
    try {
        const [rows, fieldDefs] = await db.pool.query(`
            SELECT id, code FROM ${tableName} WHERE id = ?`, [staff_id]
        );
        var list = []
        for (let row of rows) {
            let work = new Work(row.id, row.code);
            list.push(work);
        }
        return list;
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }

}

/**
 * Insert a work object into the database if it does not exist
 * @param {Work} work 
 */
async function insertOne(work) {
    try {
        const exists = await findOne(work);
        if (exists.length == 0) {
            const [rows, fieldDefs] = await db.pool.query(`
            INSERT INTO ${tableName} (id, code) VALUES (?, ?)
            `, [work.id, work.code]);
        }
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * Insert a list of work entries
 * @param {[Work]} works 
 */
async function insertMany(works) {
    for (let work of works) {
        await insertOne(work);
    }
}

/**
 * Delete a work object from the database
 * @param {Work} work 
 */
async function deleteOne(work) {
    try {
        await db.pool.query(`
            DELETE FROM ${tableName} where id = ? AND code = ?`, [work.id, work.code]);
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}


module.exports =  { Work, all, findOne, findByStaffId,  sync, insertOne, insertMany, deleteOne }