const express = require("express");

const { Op } = require("sequelize");
const { sequelize, courses } = require("./models");
const app = express();
const PORT = 5000;

app.get("/api/courses/", async (req, res) => {
  const code = req.query.code;
  const returnedCourses = await courses.findAll({
    where: {
      code: {
        [Op.substring]: code,
      },
    },
  });
  res.send(returnedCourses);
});

app.get("/api/courses/:code", async (req, res) => {
  const { code } = req.params;
  const returnedCourses = await courses.findOne({
    where: {
      code: code,
    },
  });
  res.send(returnedCourses);
});

app.listen(PORT, () => {
  console.log(`sever started on port ${PORT}`);
});
