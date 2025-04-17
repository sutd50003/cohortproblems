const express = require('express');
const deptmodel = require('../models/dept.js');
const staffmodel = require('../models/staff.js');
var router = express.Router();


router.get('/add/:code', async function(req, res, next) {
    
    res.send(`TODO`); // TODO: Fixme
});



/* GET dept listing. */

router.get('/all/', async function(req, res, next) {
    res.send(`TODO`); // TODO: Fixme
});


router.get('/all/withstaff/', async function(req, res, next) {
    res.send(`TODO`); // TODO: Fixme
})


module.exports = router;
