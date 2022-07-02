const { checkSchema } = require("express-validator");
const { Report } = require("../models");

const schema = {
  reason: {
    in: ["body"],
    isIn: {
      options: [
        [
          "Dead or expired link.",
          "Malicious or irrelevant link.",
          "Duplicate link.",
        ],
      ],
      errorMessage: "You must choose a valid reason to report a groupchat.",
    },
  },
  groupchatId: {
    notEmpty: {
      errorMessage: "Cannot leave groupchatId empty",
    },
    isInt: {
      errorMessage: "groupchatId must be an integer.",
    },
  },
};

module.exports = { schema };
