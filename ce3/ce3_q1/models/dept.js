const db = require('./db.js');
const workModel = require('./work.js');
const staffModel = require('./staff.js');
const tableName = 'dept';


class Dept {
    constructor(code) {
        this.code = code;
    }
}


async function sync() {
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

/**
 * 
 * @returns a list of all dept entries
 */
async function all() {
    try {
        const [rows, fieldDefs] = await db.pool.query(`
            SELECT code FROM ${tableName}
        `);
        var list = [];
        for (let row of rows) {
            let dept = new Dept(row.code);
            list.push(dept);
        }
        return list;
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * find one dept entry by code
 * @param {string} code 
 * @param {boolean} with_staffs 
 * @returns a list of dept entries (either empty or one)
 */
async function findOneByCode(code, with_staffs=false) {
    try {
        const [rows, fieldDefs] = await db.pool.query(`
            SELECT code FROM ${tableName} WHERE code = ?`, [code]
        );
        var list = []
        for (let row of rows) {
            let dept = new Dept(row.code);
            if (with_staffs) {
                const staffs  = staffModel.findByDept(dept.code);
                dept.staffs = staffs;
            }
            list.push(dept);
        }
        return list;
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * insert a dept entry if it does not exist
 * @param {Dept} dept 
 */
async function insertOne(dept) {
    try {
        const exists = await findOneByCode(dept.code);
        if (exists.length == 0) {
            const [rows, fieldDefs] = await db.pool.query(`
            INSERT INTO ${tableName} (code) VALUES (?)
            `, [dept.code]);
        }
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

/**
 * insert a list of dept entries
 * @param {[Dept]} depts 
 */
async function insertMany(depts) {
    for (let dept of depts) {
        await insertOne(dept);
    }
}

/**
 * delete a dept entry from the db
 * @param {Dept} dept 
 */
async function deleteOne(dept) {
    try {
        const [rows, fieldDefs] = await db.pool.query(`
            DELETE FROM ${tableName} where code = ?`, [dept.code]);
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}


module.exports =  { Dept, all, findOneByCode, sync, insertOne, insertMany, deleteOne }