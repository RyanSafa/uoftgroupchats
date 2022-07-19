const express = require("express");
const router = express.Router();
const groupchatsController = require("../controllers/groupchatsController");
const {
  schema: groupchatSchema,
} = require("../validationSchemas/groupchatValidationSchema");
const { validateRequest } = require("../middleware/requestValidation");
const { checkSchema } = require("express-validator");

router.post(
  "/",
  checkSchema(groupchatSchema),
  validateRequest,
  groupchatsController.createGroupchat
);

router.get("/:courseId/:lecture", groupchatsController.getGroupchats);

module.exports = router;
