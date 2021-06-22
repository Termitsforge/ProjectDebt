import {Router} from 'express';
const router = Router();
import mongoose from 'mongoose';
import Debt from '../models/notebook.js';
let arrDebts = [];
router.get('/', (req, res) => {
    res.render('notebook.hbs', {
    });
});

router.get('/about', (req, res) => {
    const debt = Debt.find({ idDebt: req.session.ID }, (err, result) => {
        if (err) console.log(err);
        else {
            console.log(result);
            arrDebts[0] = result;
        }
    });
    const creditor = Debt.find({ idCreditor: req.session.ID }, (err, result) => {
        if (err) console.log(err);
        else {
            console.log(result); 
            arrDebts[1] = result; 
            
        }
    });
    let send = JSON.stringify(arrDebts);
    res.send(send);
});
export default router;