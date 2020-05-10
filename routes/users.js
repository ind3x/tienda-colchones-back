const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');

/* Users CRUD */
router.post('/login', (req, res, next) => {
    let body = req.body;
    User.findOne({email: body.email}, (err, userDb) => {
        if (err) {
            return res.status(500).json(err)
        }

        if (!userDb) {
            userDb = new User({email: body.email, password: bcrypt.hashSync(body.password, 10)});
            userDb.save((err, userDb) => {
                if (err) {
                    return res.status(400).json(err);
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDb.password)) {
            return res.status(400).json({
                err: {message: "Incorrent user or password"}
            });
        }

        let token = jwt.sign(
            {user: userDb},
            process.env.AUTHENTICATION_SEED,
            {expiresIn: process.env.TOKEN_EXPIRES_IN}
        );

        res.json({
            user: userDb,
            token: token,
        });
    });
});

router.post('/register', function (req, res) {
    let body = req.body;
    let {email, password, role} = body;
    let user = new User({email, password: bcrypt.hashSync(password, 10), role});
    user.save((err, userDb) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.json(userDb);
    });
});

module.exports = router;
