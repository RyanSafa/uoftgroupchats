const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/coursesController");

router.get("/search/:code", coursesController.serachCourses);

router.get("/:code", coursesController.getCourse);

module.exports = router;
