const express = require("express");
const cors = require('cors')
const { Op } = require("sequelize");
const { sequelize, courses } = require("./models");
const app = express();
const PORT = 5000;
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/api/search/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const returnedCourses = await courses.findAll({
      where: {
        code: {
          [Op.substring]: code,
        },
      },
    });
    console.log(returnedCourses)
    res.send(returnedCourses);
  } catch (err) {
    console.log(err)
  }
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
