const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reportsController");
const {
  schema: reportSchema,
} = require("../validationSchemas/reportValidationSchema");
const { validateRequest } = require("../middleware/requestValidation");
const { checkSchema } = require("express-validator");
const rateLimit = require("express-rate-limit");
const createReportLimiter = rateLimit({
  windowMs: 86400000, // 24 hours
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message:
    "Too many reports created by one user. Please try again after 24 hours",
  skipFailedRequests: true,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next, options) => {
    next({ status: options.statusCode, message: options.message });
  },
});
router.post(
  "/",
  checkSchema(reportSchema),
  validateRequest,
  createReportLimiter,
  reportsController.createReport
);

module.exports = router;
