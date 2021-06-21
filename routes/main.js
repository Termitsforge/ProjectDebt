import {Router} from 'express';
import { model } from 'mongoose';
const router = Router();
import Debt from '../models/notebook.js';
import User from'../models/user.js';

router.get('/', (req, res) => {
    res.render('main_ws.hbs', {
    });
});

export default router;