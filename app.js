require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var allowCrossDomain = require('./lib/middleware/CORS');
//Port # from heroku
// const { PORT } = process.env;
const PORT = process.env.PORT || 8000;

var api = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
	console.log('\x1b[41m%s\x1b[0m', 'ERROR_STATUS:', err.status, '\x1b[41mERROR_MESSAGE:\x1b[0m', err.message);
	res.status(err.status || 500).send({message: err.message});
});
app.listen(PORT, () => console.log('Running server with port %d!', PORT));

module.exports = app;
