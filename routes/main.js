const {Router} = require('express');
const { model } = require('mongoose');
const router = Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('main_ws.hbs', {
    });
});

module.exports = router;