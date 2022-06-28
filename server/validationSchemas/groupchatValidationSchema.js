const { body } = require("express-validator");
const schema = [
  body("type").notEmpty().withMessage("Type cannot be empty."),
  body("link").notEmpty().withMessage("Link cannot be empty."),
  body("lecture").notEmpty().withMessage("Lecture cannot be empty."),
  body("courseId").notEmpty().withMessage("Course Id cannot be empty."),
];

module.exports = { schema };
