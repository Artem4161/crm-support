const Ajv = require('ajv');

const ajv = new Ajv({
  allErrors: true,
});

function errorResponse(schemaErrors) {
  const errors = schemaErrors.map((error) => ({
    path: error.dataPath,
    message: error.message,
  }));
  return {
    status: 'failed',
    errors,
    message: 'Error validate',
  };
}

const validateSchema = (schema) => (req, res, next) => {
  console.log('next', next);
  const valid = ajv.validate(schema, req.body);
  console.log('valid', valid);
  if (!valid) {
    res.status(422).send(errorResponse(ajv.errors));
  } else {
    next();
  }
};

module.exports = {
  validateSchema,
  errorResponse,
  ajv,
};
