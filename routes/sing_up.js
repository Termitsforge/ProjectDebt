import {Router} from 'express';
const router = Router();
import User from'../models/user.js';

router.get('/', (req, res) => {
    res.render('sing_up.hbs');
});
router.post('/', async (req, res) => {
    req.session.nameAuth = req.body.name;
    req.session.save(err => {
        if (err) {
            console.log(err)
        }
    });
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });
    const users = User.find();
    try {
        await user.save();
        res.redirect('/main');
    } catch (e) {
        console.log(e)
    }

});
export default router;