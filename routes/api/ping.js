var router = require('express').Router();

// router.use(middleware_auth);

router.get('/', function(req, res, next) {
  // res.send('TESTING /');
  api_response(res, 200, "PONG!", {"ping": "pong"});
});

module.exports = router;
