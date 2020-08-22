var router = require('express').Router();

// Authentication with the Connect API is the same on the outside
// to authentication with the Letters API because we actually use
// the Letters API to 'authenticate' a user. Once a user is
// authenticated, we create a 'session' which is used to
// authenticate future requests.
// A 'session' is a record in the database with the following fields...
//   1. user_id
//   2. token
//   3. expires_at
//   4. facility_id
//   5. facility_role
// The 'user_id' and 'token' are pulled directly from the User resource
// from the Letters API upon successful authentication. The 'expires_at'
// field is a datetime set to 2 hours after the authentication attempt.
// A job will run and delete sessions that are expired.


// POST /api/auth/login
// Login with email+password
// Returns the User resource from the Letters API
router.post('/login', async function(req, res, next) {
  var data = req.body;

  var call = await letters.login(data.email, data.password);

  if (!call.ok) {
    return api_response(res, 400, call.data, {});
  }

  return api_response(res, 200, "", call.data.data);
});


// POST /api/auth/login/remember
// Login with remember_token
// Returns the User resource from the Letters API
router.post('/login/remember', function(req, res, next) {
  res.send('TESTING /cat');
});

module.exports = router;