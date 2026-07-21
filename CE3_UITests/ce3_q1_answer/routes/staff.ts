import express, { Request, Response, NextFunction } from 'express';
import * as staffModel from '../models/staff';

const router = express.Router();

// AJAX end points

router.get('/all/', async (_req: Request, res: Response, _next: NextFunction) => {
    const staffs = await staffModel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(JSON.stringify(staffs));
});

router.post('/submit/', async (req: Request, res: Response, _next: NextFunction) => {
    const name = req.body.name;
    const code = req.body.code;
    await staffModel.insertOne(staffModel.Staff.newStaff(name, code));
    const staffs = await staffModel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(JSON.stringify(staffs));
});

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
    res.render('staff', { title: 'staff' });
});

export default router;
