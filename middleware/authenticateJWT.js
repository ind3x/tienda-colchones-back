const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.token) {
        const token = req.token;

        jwt.verify(token, process.env.AUTHENTICATION_SEED, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }
};