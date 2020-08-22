require('dotenv').config();

require('./helpers');

const express = require('express');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use(require('./routes'));

// catch 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Handle Debug Stacktrace Printing
if (process.env.APP_DEBUG) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors' : {
      message: err.message,
      error: err
    }});
  });
} else {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: {}
    }});
  });
}

app.listen(process.env.APP_PORT, () => {
  console.log(`Running on port ${process.env.APP_PORT}...`);
});
