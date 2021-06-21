import {Router} from 'express';
const router = Router();


router.get('/', (req, res) => {
    res.render('main_ws.hbs', {
    });
});

export default router;