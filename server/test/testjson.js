const fs = require("fs");
const path = require("path");

const courseData = async () => {
  return JSON.parse(
    await fs.readFileSync(
      path.resolve(__dirname, "../createCourses/courses.json")
    )
  );
};

const getCourses = async () => {
  const res = await courseData();
  console.log(res.courses);
};
