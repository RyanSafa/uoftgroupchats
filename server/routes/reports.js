const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reportsController");
const {
  schema: reportSchema,
} = require("../validationSchemas/reportValidationSchema");
const { validateRequest } = require("../middleware/requestValidation");
const { checkSchema } = require("express-validator");

router.post(
  "/",
  checkSchema(reportSchema),
  validateRequest,
  reportsController.createReport
);

module.exports = router;
