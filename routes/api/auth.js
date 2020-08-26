var router = require('express').Router();
var joi = require('joi');

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
// @param email
// @param password
router.post('/login', async function(req, res, next) {
  var data = req.body;

  // VALIDATION
  try {
    var {valid, errors} = await validate(res, req, {
      "email": joi.string().email(),
      "password": joi.string().alphanum().min(8)
    }).catch(function() {});

    if (!valid) {
      return api_response(res, 400, "", errors);
    }
  } catch (error) {
    // pass
  }

  var call = await letters.login(data.email, data.password);

  if (!call.ok) {
    return api_response(res, 400, call.data, {});
  }

  return api_response(res, 200, "", call.data.data);
});


// POST /api/auth/login/remember
// Login with remember_token
// Returns the User resource from the Letters API
// @param remember
router.post('/login/remember', async function(req, res, next) {
  var data = req.body;

  // VALIDATION
  try {
    var {valid, errors} = await validate(res, req, {
      "remember": joi.string().min(100).max(100)
    }).catch(function() {});

    if (!valid) {
      return api_response(res, 400, "", errors);
    }
  } catch (error) {
    // pass
  }

  var call = await letters.login_with_remember(data.remember);

  if (!call.ok) {
    return api_response(res, 400, call.data, {});
  }

  return api_response(res, 200, "", call.data.data);
});

module.exports = router;
