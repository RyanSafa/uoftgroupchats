const { QUERY } = require("./constants");
const fetch = require("node-fetch");
const fs = require("fs");

const getRequest = async () => {
  let courseDict = { courses: [] };
  try {
    const res = await fetch(QUERY);
    const courses = await res.json();
    courses_test = Object.keys(courses).length;
    for (const course in courses) {
      const courseData = courses[course];
      const { code, section, courseTitle, meetings } = courseData;
      let codeName;
      if (section === "Y") {
        codeName = code;
      } else {
        codeName = `${code}-${section}`;
      }

      const index = courseDict.courses.push({
        code: codeName,
        title: courseTitle,
        lectures: [],
      });

      courseDict.courses[index - 1].lectures.push("Unspecified Lecture");

      for (meeting in meetings) {
        if (meeting.slice(0, 3) === "LEC") {
          courseDict.courses[index - 1].lectures.push(meeting);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
  return courseDict;
};

// create the json file
getRequest().then((res) => {
  const dict = res;
  const json = JSON.stringify(dict);
  fs.writeFile("courses.json", json, "utf8", (e) => {
    console.log(e);
  });
});
