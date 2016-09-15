var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

//Bring in the data model
require('./api/mongoose/mongoose');
//Bring in the Passport config after model is defined
require('./api/passport/passport');

//Bring in the routes for the API (delete the default routes)
var routesApi = require('./api/routes/router');

var app = express();

app.use(favicon(__dirname + '/angular/icon/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/bower_components',  express.static( path.join(__dirname, '/bower_components')));
//Set the angular folder to serve static resources
app.use(express.static(path.join(__dirname, '/angular')));

//Initialise Passport before using the route middleware
app.use(passport.initialize());

//Use the API routes when path starts with /api
app.use('/api', routesApi);

//Otherwise render the index.html page for the Angular SPA
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '/angular', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

//Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

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

module.exports = app;