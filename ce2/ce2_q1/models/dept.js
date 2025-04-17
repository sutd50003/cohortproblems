const db = require('./db.js').db;
const findStaff = require('./staff.js').find;

const collectionName = 'dept'

class Dept {
    constructor(code) {
        this.code = code;
    }
}

/** return all depts */
async function all() {
    depts = await find({});
    return depts;
}

/** find a set of depts satisfying p */
async function find(p) {
    try {
        const collection = db.collection(collectionName);
        const cursor = collection.find(p);
        var depts = [];
        while (await cursor.hasNext()) {
            const dbobj = await cursor.next();
            const dept = new Dept(dbobj.code);
            depts.push(dept);
        }
        return depts;
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    } 
}

/** insert a list of depts */
async function insertMany( depts ) {
    try {
        const collection = db.collection(collectionName);
        await collection.insertMany(depts);
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    } 
}


module.exports = { Dept, all, find, insertMany }