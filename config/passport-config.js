// var passport = require('passport')
//     , LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/user');

// //'local' is the name of the strategy we will use it in authentication
// passport.use('local', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// },
//     function (username, password, done) {
//         User.findOne({ email: username }, function (err, user) {
//             if (err) { return done(err); }
//             if (!user) {
//                 return done(null, false, { message: 'Incorrect username.' });
//             }
//             if (!user.isValid(password)) {
//                 return done(null, false, { message: 'Incorrect password.' });
//             }
//             return done(null, user);
//         });
//     }
// ));

// //serialize and deserialize user instances to and from the session.
// passport.serializeUser(function (user, done) {
//     done(null, user._id);
// });

// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         done(err, user);
//     });
// });


var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.isValid(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));


// passport.serializeUser(function (user, done) {
//     done(null, user._id);
// });

// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         done(err, user);
//     });
// });

passport.serializeUser(function (user, done) {
    // console.log();
    // console.log('serialize: ' + user._id)
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    // console.log();
    // console.log('deserialize: ' + id)
    User.findById(id, (err, user) => {
        // console.log(user)
        if (err) {
            console.log('err: '+err);
            return done(err);
        }
        return done(err, user);
    });

});
