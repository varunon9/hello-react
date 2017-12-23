/**
 * Created by: Varun kumar
 * Date: 23 December, 2017
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var env = process.env.NODE_ENV || 'development';

/**
 * Get all routes here
 */
var indexRoutes = require('./routes/index');

// api is for users
var apiRoutes = require('./routes/api');

var app = express();

/**
 * Get all middlewares here
 */

// setting view engine as ejs with file extension .html
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

app.use(bodyParser.json({
    limit: '8mb'
})); // support json encoded bodies

app.use(bodyParser.urlencoded({
    limit: '8mb',
    extended: true
})); // support encoded bodies

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// logging POST Requests and parameters
app.use(function(req, res, next) {
    if (req.method == 'POST') {
        console.log('\x1b[36m%s\x1b[0m', 'Request URL:', req.originalUrl);
        console.log(req.body);
        console.log('\x1b[33m%s\x1b[0m', '---------------------------------');
    }
    next();
});

/**
 * Set all routes here
 */
/*app.use('/dashboard', auth);*/
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    console.log(err);

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
