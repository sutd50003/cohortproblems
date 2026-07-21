import express, { Request, Response, NextFunction } from 'express';
import * as deptModel from '../models/dept';
import * as staffModel from '../models/staff';

const router = express.Router();

// AJAX end points

router.get('/all/', async (req: Request, res: Response, _next: NextFunction) => {
    const depts = await deptModel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(JSON.stringify(depts));
});

router.get('/all/withstaff/', async (req: Request, res: Response, _next: NextFunction) => {
    const depts = await deptModel.all();
    for (const dept of depts) {
        const staffs = await staffModel.findByDept(dept.code);
        dept.staffs = staffs;
    }
    res.send(JSON.stringify(depts));
});

router.post('/submit/', async (req: Request, res: Response, _next: NextFunction) => {
    const code = req.body.code;
    await deptModel.insertOne(new deptModel.Dept(code));
    const depts = await deptModel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(JSON.stringify(depts));
});

// View end points
/** render the add dept page */
router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
    res.render('dept', { title: 'department' });
});

export default router;
