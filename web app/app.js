var path            =   require('path');
var favicon         =   require('serve-favicon');
var logger          =   require('morgan');
var validator       =   require('express-validator');
var cookieParser    =   require('cookie-parser');
var session         =   require('express-session');
var passport		    =   require('passport');
var flash  			    =   require('connect-flash');
var sql             =   require('mssql');
var cors            =   require("cors");
var MssqlStore      =   require('mssql-session-store')(session);
var bodyParser      =   require('body-parser');
var expressHbs    	=   require('express-handlebars');
var express         =   require('express');


var api             =   require('./api/mobile');
var index           =   require('./routes/index');
var admin           =   require('./routes/admin');

var app = express();

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

//connection to database
require('./config/db.js');
//Import The configuration file of the project
require('./config/passport');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cors());
app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 18000 * 6000 * 100000}
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));


/*app.use(function(req, res, next){
    res.locals.login = req.isAuthenticated();
    res.locals.session = res.session;
    next();
});*/


app.use('/', index);
app.use('/admin', admin);
app.use('/api',api);
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
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
