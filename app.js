// Конфиурация и настройка параметров для логирования
var config = require('./config');
process.env.NODE_ENV = config.get('node_env');
var log = require('./lib/log')(module);
//----
////
//  https://github.com/chriso/validator.js
//	https://github.com/guillaumepotier/Parsley.js
//	https://github.com/jquery-validation/jquery-validation   https://jqueryvalidation.org/documentation/
//  https://codepen.io/jaycbrf/pen/iBszr
////
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes'); // Контроллер

var app = express();

// Задаем env
app.set('env', process.env.NODE_ENV || config.get('node_env'));
log.debug("process.env.NODE_ENV = "+ process.env.NODE_ENV || config.get('node_env'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger(('dev')));                 // todo: logger - различные форматы dev, default, common, combined
//app.use(bodyParser.json());               // req.body....
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());                  // req.coolies... // todo: cookieParser('your secret')
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  //NODE_ENV = [development || production] = app.set('env',NODE_ENV)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
