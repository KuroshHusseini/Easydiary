'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');


const login = (req, res) => {
    // TODO: add passport authenticate
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log('error', err, info);
        if (err || !user) {
            return res.status(422).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                return res.status(401).json({
                    message: 'Unauthorized',
                    user: user
                });
            }
            // generate a signed son web token with the contents of user object and return it in the response
            console.log("jwt", user);
            const token = jwt.sign(user, '021Kurosh');
            return res.json({user, token});
        });
    })(req, res);
};

module.exports = {
    login,
};