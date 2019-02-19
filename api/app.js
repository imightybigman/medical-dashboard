const createError      = require('http-errors');
const express          = require('express');
const path             = require('path');
const app              = express();
const cors = require('cors');
const visitsController = require('./controller/visits');
const loginController = require('./controller/login');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ 'hello' : 'world' });
});

app.use('/api/login', loginController);
app.use('/api/visits', visitsController);

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
  res.json({
    error: err.message
  })
});

module.exports = app;
