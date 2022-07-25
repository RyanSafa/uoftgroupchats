const express = require("express");
const router = express.Router();
const groupchatsController = require("../controllers/groupchatsController");
const {
  schema: groupchatSchema,
} = require("../validationSchemas/groupchatValidationSchema");
const { validateRequest } = require("../middleware/requestValidation");
const { checkSchema } = require("express-validator");
const rateLimit = require("express-rate-limit");
const createGroupChatLimiter = rateLimit({
  windowMs: 10800000, // 3 hours
  max: 6, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message:
    "To many group chats created by one user. Please try again after three hours",
  skipFailedRequests: true,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next, options) => {
    next({ status: options.statusCode, message: options.message });
  },
});
router.post(
  "/",
  checkSchema(groupchatSchema),
  validateRequest,
  createGroupChatLimiter,
  groupchatsController.createGroupchat
);

router.get("/:courseId/:lecture", groupchatsController.getGroupchats);

module.exports = router;
