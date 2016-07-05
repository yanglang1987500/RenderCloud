var express = require('express');
 var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('cookie-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var rd = require('rd');



var ejs = require('ejs');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: 'DataPlatform',
  secret: 'DataPlatform'
}));
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

/**
 * 加载路由配置
 */
rd.eachFileFilterSync('./routes', /\.js$/, function (f, s) {
  console.log(f);
  var mod = require(f);
  app.use(mod);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
process.on('uncaughtException', function (err) {
  console.log('exception catch ...');
  console.log(err.stack);
});
app.listen(8080);
module.exports = app;
