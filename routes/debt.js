// const {Router} = require('express');
// const { model } = require('mongoose');
// const router = Router();
// const Debt = require('../models/notebook.js');
// const User = require('../models/user.js');

import {Router} from 'express';
import { model } from 'mongoose';
const router = Router();
import Debt from '../models/notebook.js';
import User from'../models/user.js';
router.get('/', (req, res) => {
    res.render('debt.hbs', {
    });
});
router.post('/', async (req, res) => { 
    const user = User.findOne({ name: req.body.name }, (err, result) => {
        if (err) console.log(err);
        else {
            if (result === null) {
                res.render('debt.hbs', {
                    isVisible: true,
                    message: 'Такого пользователя нет'
                });
            }
            else {
                const debt = new Debt({
                    idDebt: result.id, 
                    idCreditor: req.session.ID,
                    Sum: req.body.sum,
                    nameDebt: result.name,
                    nameCreditor: req.session.nameAuth,
                });
                debt.save(); 
                res.render('debt.hbs', {
                    isVisible: true,
                    message: 'Долг добавлен'
                });
            }
        }
    });
});
module.exports = router;