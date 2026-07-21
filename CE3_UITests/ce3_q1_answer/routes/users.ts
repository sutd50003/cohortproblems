import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (_req: Request, _res: Response, _next: NextFunction) => {
  _res.send('respond with a resource');
});

export default router;
