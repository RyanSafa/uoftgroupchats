const { ORGS, QUERY } = require("./constants");
const fetch = require("node-fetch");
const fs = require("fs");

// make a fetch request to the UofT timetable API to get the courses with the given org
const getRequest = async (org) => {
  let courseDict = { courses: [] };
  try {
    const res = await fetch(QUERY + `${org}`);
    const courses = await res.json();
    courses_test = Object.keys(courses).length;
    for (const course in courses) {
      const courseData = courses[course];
      const { code, courseTitle, meetings } = courseData;
      const index = courseDict.courses.push({
        code: code,
        coursTitle: courseTitle,
        tutorials: [],
        lectures: [],
      });
      for (meeting in meetings) {
        if (meeting.slice(0, 3) === "LEC") {
          courseDict.courses[index - 1].lectures.push(meeting);
        }
        if (meeting.slice(0, 3) === "TUT") {
          courseDict.courses[index - 1].tutorials.push(meeting);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
  return courseDict;
};

// Loop through very org, and accumulate the orgs in the courses dictionary
const getCourses = async () => {
  let courses = { courses: [] };
  for (org of ORGS) {
    try {
      const response = await getRequest(org);
      courses.courses = [...response.courses, ...courses.courses];
    } catch (error) {
      console.log(error);
    }
  }
  return courses;
};

// create the json file
getCourses().then((res) => {
  console.log(res);
  const dict = res;
  const json = JSON.stringify(dict);
  fs.writeFile("courses.json", json, "utf8", (e) => {
    console.log(e);
  });
});
