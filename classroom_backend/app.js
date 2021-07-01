var createError = require('http-errors');
var express = require('express');
var cors = require("cors");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
import indexRouter from './routes/index';
import joinClassesRouter from './routes/join_classes';
import materialsRouter from './routes/materials';
import schedulesRouter from './routes/schedules';
import classesRouter from './routes/classes';
import presencesRouter from './routes/presences';
import authRouter from './routes/profile';
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/foto', express.static('foto'));
app.use('/file', express.static('file'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/materials', materialsRouter);
app.use('/schedules', schedulesRouter);
app.use('/presences', presencesRouter);
app.use('/class', classesRouter);
app.use('/auth', authRouter);
app.use('/class/join', joinClassesRouter);

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
process.env.TZ = "Asia/Jakarta";
module.exports = app;