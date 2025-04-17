const express = require('express');
const deptModel = require('../models/dept.js');
const staffModel = require('../models/staff.js');
var router = express.Router();



// AJAX end points

router.get('/all/', async function(req, res, next) {
    const depts = await deptModel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(`${JSON.stringify(depts)}`);
});



router.get('/all/withstaff/', async function(req, res, next) {
    const depts = await deptModel.all();
    for (i in depts) {
        const dept = depts[i];
        const staffs = await staffModel.find({'dept':dept.code})
        dept.staffs = staffs
    }
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(`${JSON.stringify(depts)}`);
})

router.post('/submit/', async function(req, res, next) {
    const code = req.body.code;
    await deptModel.insertOne(new deptModel.Dept(code));
    const depts = await deptModel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(`${JSON.stringify(depts)}`);
})


// View end points
/** render the add dept page */
router.get('/', async function(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.render('dept', { title:'department'})
})


module.exports = router;
