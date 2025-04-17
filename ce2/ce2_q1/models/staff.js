const db = require('./db.js').db;

const collectionName = 'staff'

class Staff {
    constructor(id, name, dept_code) {
        this.id = id;
        this.name = name;
        this.dept = dept_code;
    }
}

/** return all staffs */
async function all() {
    const staffs = await find({});
    return staffs;
}

/** find a set of staffs satisfying p */
async function find(p) {
    try {
        const collection = db.collection(collectionName);
        const cursor = collection.find(p);
        var staffs = [];
        while (await cursor.hasNext()) {
            const dbobj = await cursor.next();
            staffs.push(new Staff(dbobj.id, dbobj.name, dbobj.dept));
        }
        return staffs;
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    } 
}

/** insert a list of staffs */
async function insertMany( staffs ) {
    try {
        const collection = db.collection(collectionName);
        await collection.insertMany(staffs);
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    } 
}


module.exports = { Staff, all, find, insertMany }