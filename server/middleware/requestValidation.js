const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next({ status: 400, message: errors.array()[0].msg });
  }
  next();
};

module.exports = { validateRequest };
