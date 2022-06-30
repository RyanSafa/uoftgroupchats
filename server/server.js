const express = require("express");
const cors = require("cors");
const { Op } = require("sequelize");
const { Course, Groupchat } = require("./models");
const { checkSchema } = require("express-validator");

const app = express();
const PORT = 5000;
const bodyParser = require("body-parser");
const { validateRequest } = require("./middleware/requestValidation");
const {
  schema: groupchatSchema,
} = require("./validationSchemas/groupchatValidationSchema");
const ErrorHandler = require("./middleware/errorHandling");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/search/:code", async (req, res, next) => {
  const { code } = req.params;
  try {
    const returnedCourses = await Course.findAll({
      attributes: ["code", "id", "title"],
      limit: 5,
      where: {
        code: {
          [Op.substring]: code,
        },
      },
    });
    return res.send(returnedCourses);
  } catch (error) {
    next({ status: 500, message: "" });
  }
});

app.get("/api/courses/:code", async (req, res, next) => {
  const { code } = req.params;
  try {
    const course = await Course.findOne({
      include: Groupchat,
      where: {
        code,
      },
    });
    if (course) {
      return res.send(course);
    } else {
      throw new Error("Not Found");
    }
  } catch (error) {
    if (error.message === "Not Found") {
      next({ status: 404, message: "Book not found" });
    } else {
      next({ status: 400, message: "" });
    }
  }
});

app.post(
  "/api/groupchats/",
  checkSchema(groupchatSchema),
  validateRequest,
  async (req, res) => {
    try {
      const { type, link, lecture, courseId } = req.body;

      const groupchat = await Groupchat.create({
        type,
        link,
        lecture,
        courseId,
      });
      return res.send(groupchat);
    } catch (error) {
      next({ status: 500, message: "" });
    }
  }
);

app.use("/*", (req, res, next) => {
  next({ stats: 404, message: "Page not found." });
});

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`sever started on port ${PORT}`);
});
