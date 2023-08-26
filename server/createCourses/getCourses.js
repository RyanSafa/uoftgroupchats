const { QUERY, QUERY_TTB } = require("./constants");
const fetch = require("node-fetch");
const fs = require("fs");

const getRequest = async () => {
  let courseDict = { courses: [] };
  try {
    // const res = await fetch(QUERY);
    const body = {
      "courseCodeAndTitleProps": {
        "courseCode": "",
        "courseTitle": "",
        "courseSectionCode": ""
      },
      "departmentProps": [],
      "campuses": [],
      "sessions": [
        "20239",
        "20241",
        "20239-20241"
      ],
      "requirementProps": [],
      "instructor": "",
      "courseLevels": [],
      "deliveryModes": [],
      "dayPreferences": [],
      "timePreferences": [],
      "divisions": [
        "ARTSC"
      ],
      "creditWeights": [],
      "page": 1,
      "pageSize": 4000,
      "direction": "asc"
    };

    const res = await fetch(QUERY_TTB, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Accept': 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'Connection': 'keep-alive',
      'Content-Length': Buffer.byteLength(JSON.stringify(body)),
      'Content-Type': 'application/json',
      'Host': 'api.easi.utoronto.ca',
      'Origin': 'https://ttb.utoronto.ca',
      'Referer': 'https://ttb.utoronto.ca',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-site'}
    });

    // const courses = await res.json();
    const payload = await res.json();
    const courses = payload.payload.pageableCourse.courses
    courses_test = Object.keys(courses).length;
    for (const course in courses) {
      const courseData = courses[course];
      const { code, sectionCode, name, sections } = courseData;
      let codeName;
      if (sectionCode === "Y") {
        codeName = code;
      } else {
        codeName = `${code}-${sectionCode}`;
      }

      const index = courseDict.courses.push({
        code: codeName,
        title: name,
        lectures: [],
      });

      courseDict.courses[index - 1].lectures.push("Unspecified Lecture");

      for (meeting in sections) {
        const lec = sections[meeting].name
        if (lec.slice(0, 3) === "LEC") {
          courseDict.courses[index - 1].lectures.push(lec);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
  return courseDict;
};

// create the json fileg
getRequest().then((res) => {
  const dict = res;
  const json = JSON.stringify(dict);
  fs.writeFile("courses2023.json", json, "utf8", (e) => {
    console.log(e);
  });
});
