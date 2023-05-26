var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes');
var saveRouter = require('./routes/save');
var verifyRouter = require('./routes/verify');
var screenshotsRouter = require('./routes/screenshots');

var app = express();

app.use(bodyParser.raw({type:'application/octet-stream',limit:'10Mb'  }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/save', saveRouter);
app.use('/verify', verifyRouter);
app.use('/screenshots', screenshotsRouter);

module.exports = app;
