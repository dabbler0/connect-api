const axios = require('axios');

// Import Models
const Session = require("../models").Session;

const LETTERS_API_URI = process.env.LETTERS_API_URI;

var letters = {};

letters.login = async function (email, password) {
  var uri = LETTERS_API_URI + '/api/login';

  try {
    var data = await axios.post(uri, {
      email: email,
      password: password
    });
  } catch (error) {
    return {
      ok: false,
      data: error.response.data.message
    };
  }

  // Initial values
  var token = data.data.data.token;
  var user_id = data.data.data.id;
  var expires_at = new Date();
    expires_at.setHours(expires_at.getHours() + 2);

  var facility_id = 0;
  var facility_role = "todo";

  var new_session = {
    token: token,
    user_id: user_id,
    expires_at: expires_at,
    facility_id: facility_id,
    facility_role: facility_role
  };

  // Create Session if not exists. Otherwise, update current session
  try {
    const exists = await Session.findOne({
      where: {
        user_id: user_id
      }
    });

    if (exists) {
      await exists.update(new_session);
    } else {
      // Create new session
      const s = Session.build(new_session);
      await s.save();
    }
  } catch (error) {
      // pass
      return {
        ok: false,
        data: error
      }
  }

  return {
    ok: true,
    data: data.data
  };
}

letters.login_with_remember = async function (remember) {
  var uri = LETTERS_API_URI + '/api/login/token';

  try {
    var data = await axios.post(uri, {
      token: remember
    });
  } catch (error) {
    return {
      ok: false,
      data: error.response.data.message
    };
  }

  // Initial values
  var token = data.data.data.token;
  var user_id = data.data.data.id;
  var expires_at = new Date();
    expires_at.setHours(expires_at.getHours() + 2);

  var facility_id = 0;
  var facility_role = "todo";

  var new_session = {
    token: token,
    user_id: user_id,
    expires_at: expires_at,
    facility_id: facility_id,
    facility_role: facility_role
  };

  // Create Session if not exists. Otherwise, update current session
  try {
    const exists = await Session.findOne({
      where: {
        user_id: user_id
      }
    });

    if (exists) {
      await exists.update(new_session);
    } else {
      // Create new session
      const s = Session.build(new_session);
      await s.save();
    }
  } catch (error) {
      // pass
      return {
        ok: false,
        data: error
      }
  }

  return {
    ok: true,
    data: data.data
  };
}

global.letters = letters;
