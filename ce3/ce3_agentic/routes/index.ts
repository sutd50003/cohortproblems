import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/', function(_req: Request, res: Response, next: (err: any) => void) {
  res.render('index', { title: 'Express' });
});

export default router;