// Search for the courses you want in your json on https://timetable.iit.artsci.utoronto.ca/
// Paste this code into the console once the search is complete and a json file will automatically be downloaded.

let res = { courses: [] };
for (const course of document.querySelectorAll(".perCourse")) {
    const courseFull = course.querySelector(".pbot15").innerText;
    const courseCode = courseFull.substring(0, 6);
    const courseTitle = courseFull.substring(13);
    const courseTag = courseFull.substring(0, 10);
    const courseTerm = courseFull.charAt(courseTag.length - 1);
    const lectures = [];

    for (const meeting of course.querySelectorAll(".perMeeting")) {
        const lecCode = meeting.querySelector(".colCode").innerText;
        if (lecCode.startsWith('LEC')) {
            lectures.push(lecCode);
        }
    }

    // array based json
    res.courses.push({
        'full': courseTag,
        'code': courseCode,
        'title': courseTitle,
        'session': courseTerm,
        'lectures': lectures
    }
    );

    // object based json
    // course_object = {
    //     'code': courseCode,
    //     'title': courseTitle,
    //     'session': courseTerm,
    //     'lectures': lectures
    // }
    // res.courses[courseTag] = course_object
}

const element = document.createElement("a");
element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(res))
);
element.setAttribute("download", `few_smc_1.json`);
element.style.display = "none";
document.body.appendChild(element);
element.click();
document.body.removeChild(element);