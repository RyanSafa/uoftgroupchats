const { Course, Groupchat } = require("../models");
const { Op } = require("sequelize");

const serachCourses = async (req, res, next) => {
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
};

const getCourse = async (req, res, next) => {
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
      next({ status: 404, message: "Course not found" });
    } else {
      next({ status: 500, message: "" });
    }
  }
};

module.exports = {
  getCourse,
  serachCourses,
};
