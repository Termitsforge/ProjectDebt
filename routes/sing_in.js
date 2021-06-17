const { Router } = require('express');
const { model } = require('mongoose');
const router = Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('sing_in.hbs', {
        isVisible: false
    });
});
router.post('/', (req, res) => {
    const user = User.findOne({ name: req.body.name }, (err, result) => {
        if (err) console.log(err);
        else {
            if (result === null) {
                res.render('sing_in.hbs', {
                    isVisible: true
                });
            }
            else if (req.body.password === result.password) {
                req.session.ID = result.id;
                res.redirect('/main');
            } else {
                res.render('sing_in.hbs', {
                    isVisible: true
                });
            }
        }
    });
    req.session.nameAuth = req.body.name;
    
});
module.exports = router;