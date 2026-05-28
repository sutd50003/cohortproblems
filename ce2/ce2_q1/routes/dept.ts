import express, { Router, Request, Response, NextFunction } from 'express';
import * as deptmodel from '../models/dept';
import * as staffmodel from '../models/staff';

const router: Router = express.Router();


router.get('/add/:code', async function(req: Request, res: Response, next: NextFunction) {
    res.send(`TODO`); // TODO: Fixme
});



/* GET dept listing. */

router.get('/all/', async function(req: Request, res: Response, next: NextFunction) {
    res.send(`TODO`); // TODO: Fixme
});


router.get('/all/withstaff/', async function(req: Request, res: Response, next: NextFunction) {
    res.send(`TODO`); // TODO: Fixme
})


export default router;