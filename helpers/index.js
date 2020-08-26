require('./letters_api');
require('./validation');

// Standard method for sending all responses from the API to the client
function api_response(res, status, message, data) {
  res.status(status);

  var timestamp = new Date().getTime();

  var good = true;

  if (status != 200) {
    good = false;
  }

  res.json({
    "timestamp": timestamp,
    "good": good,
    "message": message,
    "data": data
  });
}

global.api_response = api_response;
