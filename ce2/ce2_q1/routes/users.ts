import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', function(_req: Request, res: Response, _next: express.NextFunction) {
  res.send('respond with a resource');
});

export default router;