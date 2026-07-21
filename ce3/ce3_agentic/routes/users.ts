import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/', function(_req: Request, res: Response) {
  res.send('respond with a resource');
});

export default router;