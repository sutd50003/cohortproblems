const express = require('express');
const staffModel = require('../models/staff.js');
var router = express.Router();


// AJAX end points

router.get('/all/', async function(req, res, next) {
    const staffs = await staffModel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(`${JSON.stringify(staffs)}`);
});



router.post('/submit/', async function(req, res, next) {
    const name = req.body.name;
    const code = req.body.code;
    await staffModel.insertOne(staffModel.Staff.newStaff(name, code));
    const staffs = await staffModel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(`${JSON.stringify(staffs)}`);
})


router.get('/', async function(req, res, next) {
    res.render('staff', { title:'staff'})
});

module.exports = router;
