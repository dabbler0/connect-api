var router = require('express').Router();

// router.use(middleware_auth);

router.get('/', function(req, res, next) {
  // res.send('TESTING /');
  api_response(res, 200, "COOL!", {"cat": "dog"});
});

router.get('/cat', function(req, res, next) {
  res.send("CATTT!");
});

module.exports = router;
