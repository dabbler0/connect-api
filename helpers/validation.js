const joi = require('joi');

async function validate(res, req, rules) {
  try {
    const schema = await joi.object(rules);

    const  { error } = await schema.validate(req.body, {
      abortEarly: false
    });

    const valid = error == null;

    if (!valid) {
      const { details } = error;
      var errors = [];

      details.forEach(function(d) {
        errors.push(d.message);
      });

      return {valid: false, errors: errors}
    }

    return {valid: true, errors: []};
  } catch (error) {
    // pass
  }
}

global.validate = validate;
