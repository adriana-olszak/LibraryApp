const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongodb = require('mongodb').MongoClient;

module.exports = () => {
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        (username, password, done) => {
            let user = {
                username: username,
                password: password
            };
            let url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, (err, db) => {
                let collection = db.collection('users');
                collection.findOne({
                        username: username
                    },
                    (err, results) => {
                        if (results.password === password) {
                            let user = results;
                            done(null, user);
                        } else {
                            done(null, false , {
                                message: 'Bad password'
                            });
                        }
                    });
            });

        }
    ));
};