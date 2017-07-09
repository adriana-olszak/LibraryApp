const express = require('express');
const authRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const passport = require('passport');

let router = (nav) => {
    authRouter.route('/signUp')
        .post((req, res) => {
            let url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, (err, db) => {
                let collection = db.collection('users');
                let user = {
                    username: req.body.userName,
                    password: req.body.password
                };

                collection.insert(user, (err, results) => {
                    req.login(results.ops[0], () => {
                        res.redirect('/auth/profile');
                    });
                });
            });
        });

    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), (req, res) => {
            res.redirect('/auth/profile');
        });

    authRouter.route('/profile')
        .all((req, res, next) => {
            if (!req.user) {
                res.redirect('/');
            } else {
                next();
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;