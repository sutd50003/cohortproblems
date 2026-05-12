import express, { Request, Response, Router } from 'express';
import * as staffModel from '../models/staff';

const router: Router = express.Router();

router.get('/all/', async function(_req: Request, res: Response, _next: (err: any) => void) {
  const staffs = await staffModel.all();
  res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.send(`${JSON.stringify(staffs)}`);
});

router.post('/submit/', async function(req: Request, res: Response, _next: (err: any) => void) {
  const name = req.body.name;
  const code = req.body.code;
  await staffModel.insertOne(staffModel.Staff.newStaff(name, code));
  const staffs = await staffModel.all();
  res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.send(`${JSON.stringify(staffs)}`);
});

router.get('/', async function(_req: Request, res: Response, _next: (err: any) => void) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.render('staff', { title: 'staff' });
});

export default router;