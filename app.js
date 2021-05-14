var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db');
var plantsRouter = require('./routes/plants');
var ordersRouter = require('./routes/orders');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/store/plants', plantsRouter);
app.use('/api/store/orders', ordersRouter);


app.get('/seed', (req, res)=>{
  db.migration()
  res.send(null, 200)
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send('not found', 404)
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(500).send('Server error')
});

module.exports = app;
