// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var cors = require('cors');

// var app = express();


// //CORS Middleware
// //app.use(cors());
// //for Cookies
// app.use(cors({
//   origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
//   credentials: true
// }));

// //mongoose:
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/tvmaze');


// //express-session For the Cookie

// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
// app.use(session({
//   name:'myname.sid',
//   resave:false,
//   saveUninitialized:false,
//   secret:'secret',
//   cookie:{
//     maxAge:36000000,
//     httpOnly:false,
//     secure:false
//   },
//   store: new MongoStore({ mongooseConnection: mongoose.connection })
// }));

// //Pasport Middleware
// const passport = require('passport');

// require('./config/passport-config'); //Implement local stradegy file

// app.use(passport.initialize());
// app.use(passport.session());

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var cors= require('cors');
var app = express();

app.use(cors({
  origin:['http://localhost:4200','http://127.0.0.1:4200','http://localhost:4401','http://127.0.0.1:4401'],
  credentials:true
}));

var mongoose =require('mongoose');

mongoose.connect('mongodb://localhost:27017/tvmaze',
{ useNewUrlParser: true });

//passport
var passport = require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// app.use(cookieParser("SAME_SECRET"));
app.use(session({
  name:'myname.sid',
  resave:false,
  saveUninitialized:false,
  secret:'SAME_SECRET',
  cookie:{
    maxAge:36000000,
    httpOnly:false,
    secure:false
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
require('./config/passport-config');
app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var usersRouter = require('./routes/users');
app.use('/users', usersRouter);

var indexRouter = require('./routes/index');
app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
