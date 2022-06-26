const express = require("express");
const cors = require("cors");
const { Op } = require("sequelize");
const { sequelize, Course, Groupchat } = require("./models");
const app = express();
const PORT = 5000;
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/search/:code", async (req, res) => {
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
    res.send(returnedCourses);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/courses/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const returnedCourses = await Course.findOne({
      include: Groupchat,
      where: {
        code,
      },
    });
    res.send(returnedCourses);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/groupchats/", async (req, res) => {
  const { type, link, lecture, courseId } = req.body;
  const groupchat = await Groupchat.create({ type, link, lecture, courseId });
  res.send(groupchat);
});

app.listen(PORT, () => {
  console.log(`sever started on port ${PORT}`);
});
