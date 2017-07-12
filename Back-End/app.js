var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./ThreeTier/PresentationTier/Middleware/index.js');
//var users = require('./routes/users');
var mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));



app.use('/', index);  // var index = require('./routes/index');
//app.use('/users', users);  // var users = require('./routes/users');


// catch 404 and forward to error handler
app.use(require('./ThreeTier/PresentationTier/Middleware/NotFoundHandler.js').handler);

// error handler
app.use(require('./ThreeTier/PresentationTier/Middleware/ErrorHandler.js').handler);


module.exports = app;
