const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const dogs = require('./api/dogs');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Barkwire API 🐶'
  });
});

app.use('/api/v1/dogs', dogs);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  res.status(404);
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : {}
  });
});

module.exports = app;
