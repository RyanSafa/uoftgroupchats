"use strict";
const fs = require("fs");
const path = require("path");

const courseData = async () => {
  return JSON.parse(
    await fs.readFileSync(
      path.resolve(__dirname, "../createCourses/courses.json")
    )
  );
};
module.exports = {
  async up(queryInterface, Sequelize) {
    const res = await courseData();
    return queryInterface.bulkInsert(
      "Courses",
      res.courses,
      {},
      {
        lectures: { type: new Sequelize.JSON() },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Courses", null, {});
  },
};
