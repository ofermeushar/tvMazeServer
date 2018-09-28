// var express = require('express');
// var router = express.Router();
// var User = require('../models/user');
// const passport = require('passport');
// /* GET users listing. */
// // router.get('/', function(req, res, next) {
// //   res.send('respond with a resource');
// // });

// router.post('/register', (req, res, next) => {
//   // console.log('addToDB');
//   addToDB(req, res);
// });

// router.get('/register', (req, res, next) => {
//   // console.log("get('/register");
//   res.json("ok");
// });

// router.post('/login', (req, res, next) => {
//   console.log('login');
//   passport.authenticate('local', function (err, user, info) {
//     if (err) { return res.status(501).json(err); }
//     if (!user) { return res.status(501).json(info); }
//     req.logIn(user, function (err) {
//       if (err) { return res.status(501).json(err); }
//       return res.status(200).json({ message: 'Login Success' });
//     });
//   })(req, res, next);
// });

// async function addToDB(req, res) {
//   var user = new User({
//     email: req.body.email,
//     username: req.body.username,
//     password: User.hashPassword(req.body.password),
//     creation_dt: Date.now()
//   });

//   try {
//     doc = await user.save();
//     return res.status(201).json(doc);
//   } catch (error) {
//     return res.status(501).json(error);
//   }
// }

// router.get('/user', isValidUser, function (req, res, next) {
//   console.log(req.user);
//   return res.status(200).json(req.user);
// });

// function isValidUser(req,res,next){
//   if(req.isAuthenticated()) next();
//   else return res.status(401).json({message:'Unauthorized Request'});
// }
// // function isValidUser(req, res, next) {
// //   if (req.isAuthenticated()) {
// //     console.log("yes auth");
// //     next();
// //   }
// //   else {
// //     console.log('not auth');
// //     return res.status(401).json({ message: "Unauthorized Reqest" });
// //   }
// // }

// router.get('/logout',isValidUser, function(req,res,next){
//   req.logout();
//   return res.status(200).json({message:'Logout Success'});
// })
// // router.get('/logout', function (req, res, next) {
// //   console.log("logout");
// //   req.logout();
// //   console.log(req.user);
// //   return res.status(200).json({ message: 'Logout Success' });
// // });

// module.exports = router;

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


async function addToDB(req, res) {

  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}


router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function (err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({ message: 'Login Success', user: user,
      session: req.session,
      "req.user": req.user});
    });
  })(req, res, next);
});

router.get('/user', isValidUser,  function (req, res) {
  console.log('/user');

  return res.status(200).json(req.user);
});

router.get('/logout', isValidUser, function (req, res, next) {
  req.logout();
  return res.status(200).json({ message: 'Logout Success' });
});

function isValidUser(req, res, next) {
  // if(req.isAuthenticated()) next();
  // else return res.status(401).json({message:'Unauthorized Requesttttt'});

  console.log('logged in: ' + req.isAuthenticated());
  console.log('req.method: ' + req.method);
  console.log('req.user: ' + req.user);
  if (req.isAuthenticated() || req.method === 'OPTIONS') {
  console.log('isAuthenticated: ' + req.isAuthenticated());

    return next();
  }
  //req.session.error = 'Please sign in! fuck';
  res.status(401).json({ message: 'Unauthorized Request',
  session: req.session});
}

// function isValidUser(req, res, next) {
//   if (req.isAuthenticated())
//     next();
//   else
//     return res.status(401).json({ message: 'Unauthorized Request' });
// }
module.exports = router;
