const { Router } = require('express');
const { model } = require('mongoose');
const User = require('../models/user');
const router = Router()

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
module.exports = router;