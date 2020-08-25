const Session = require("../models").Session;
const { Op } = require("sequelize");

async function auth (req, res, next) {
  var token = req.header('Authorization');

  if (token) {
    // Split token in two...
    // the first being 'Bearer'
    // the second being the token
    var full_token = token.split(' ');

    if (full_token[0] != 'Bearer') {
      return api_response(res, 401, 'Incorrect token type.', {});
    }

    // Check to see if Session exists in database for this token
    // If not, return 401
    try {
      var valid_time = new Date();

      const exists = await Session.findOne({
        where: {
          token: full_token[1]
        }
      });

      if (exists) {
        // IF SESSION EXISTS
        next();
      } else {
        // IF SESSION DOES NOT EXIST
        return api_response(res, 401, 'Unauthorized. 1', {});
      }
    } catch (error) {
      console.log(error);
      return;
    }

  } else {
    return api_response(res, 401, 'No Authorization header included.', {});
  }

  next();
}

global.middleware_auth = auth;
