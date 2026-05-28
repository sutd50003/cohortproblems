import express, { Router, Request, Response, NextFunction } from 'express';
import * as staffmodel from '../models/staff';
import * as deptmodel from '../models/dept';

const router: Router = express.Router();


/* insert a staff, should have used POST instead of GET */
router.get('/add/:id/:name/:code', async function(req: Request, res: Response, next: NextFunction) {
    res.send(`TODO`); // TODO: Fixme
});

/* GET staff listing. */

router.get('/all/', async function(req: Request, res: Response, next: NextFunction) {
    res.send(`TODO`); // TODO: Fixme
});


export default router;