import express, { Router, Request, Response, NextFunction } from 'express';
import * as deptmodel from '../models/dept';
import * as staffmodel from '../models/staff';

//import { Dept, insertMany, all} from deptmodel;

const router: Router = express.Router();


router.get('/add/:code', async function(req: Request, res: Response, next: NextFunction) {

    const code = req.params.code;
    console.log("route");
    const dept = new deptmodel.Dept(`${code}`);
    await deptmodel.insertMany([dept]);
    //const depts = await deptmodel.all();
    res.send(`Adding successful`);
});





/* GET dept listing. */

router.get('/all/', async function(req: Request, res: Response, next: NextFunction) {
    const depts = await deptmodel.all();
    res.send(`${JSON.stringify(depts)}`); // TODO: Fixme
});


router.get('/all/withstaff/', async function(req: Request, res: Response, next: NextFunction) {
    const depts = await deptmodel.all();
    const dept_staff=[]
    for (const dept of depts) {
        const cur_staff= await staffmodel.find({"dept":dept.code});
        dept_staff.push({dept,"staffs":cur_staff})
    }
    res.send(`${JSON.stringify(dept_staff)}`) // TODO: Fixme
})


export default router;