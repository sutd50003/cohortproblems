import express, { Request, Response, Router } from 'express';
import * as deptModel from '../models/dept';
import * as staffModel from '../models/staff';
import { Dept } from '../models/dept';

const router: Router = express.Router();

router.get('/all/', async function(_req: Request, res: Response, _next: (err: any) => void) {
  const depts = await deptModel.all();
  res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.send(`${JSON.stringify(depts)}`);
});

router.get('/all/withstaff/', async function(_req: Request, res: Response, _next: (err: any) => void) {
  const depts = await deptModel.all();
  for (const dept of depts) {
    const staffs = await staffModel.findByDept(dept.code);
    dept.staffs = staffs;
  }
  res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.send(`${JSON.stringify(depts)}`);
});

router.post('/submit/', async function(req: Request, res: Response, _next: (err: any) => void) {
  const code = req.body.code;
  await deptModel.insertOne(new deptModel.Dept(code));
  const depts = await deptModel.all();
  res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.send(`${JSON.stringify(depts)}`);
});

router.get('/', async function(_req: Request, res: Response, _next: (err: any) => void) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.render('dept', { title: 'department' });
});

export default router;