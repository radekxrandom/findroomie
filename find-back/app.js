var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var CustomStrategy = require('passport-custom').Strategy;
var bodyParser = require('body-parser');
var cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();
const nunjucks = require('nunjucks');
nunjucks.configure(path.join(__dirname, 'views'), {
	autoescape: true,
	express: app
});
var mongoose = require('mongoose');
var mongoDB =
  'mongodb+srv://getpies:pervmoj123@cluster0-wdadp.mongodb.net/now?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {
	useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static('static'));
app.disable('etag');
app.use(cors());

app.set('view engine', 'html');
app.set('view cache', false);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		secret: 'passport-tutorial',
		cookie: {
			maxAge: 60000
		},
		resave: false,
		saveUninitialized: false
	})
);
require('./config/passport.js')(passport);
app.use(passport.initialize());
app.use(passport.session());
var apiRouter = require('./routes/api')(app, express, passport);
app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
