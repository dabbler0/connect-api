var router = require('express').Router();

// router.use('/test', require('./test'));
router.use('/auth', require('./auth'));
router.use('/ping', require('./ping'));

router.use(function(err, req, res, next) {
  if (err.name === 'ValidationError') {
    res.status(422);
    res.json({
      errors: Object.keys(err.errors).reduce(function(errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;
