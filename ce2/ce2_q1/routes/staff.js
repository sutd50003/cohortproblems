const express = require('express');
const staffmodel = require('../models/staff.js');
const deptmodel = require('../models/dept.js');
var router = express.Router();


/* insert a staff, should have used POST instead of GET */
router.get('/add/:id/:name/:code', async function(req, res, next) {
    res.send(`TODO`); // TODO: Fixme
});

/* GET staff listing. */

router.get('/all/', async function(req, res, next) {
    res.send(`TODO`); // TODO: Fixme
});


module.exports = router;
