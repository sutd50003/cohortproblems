import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', function(req: Request, res: Response, next: express.NextFunction) {
  res.render('index', { title: 'Express' });
});

export default router;