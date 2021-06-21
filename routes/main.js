import {Router} from 'express';
import { model } from 'mongoose';
const router = Router();


router.get('/', (req, res) => {
    res.render('main_ws.hbs', {
    });
});

export default router;