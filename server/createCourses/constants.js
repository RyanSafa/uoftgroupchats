// Every course in UofT is associated with an org. We can query the UofT Timetable API
// by using a list of orgs to get every course.

// UofT Timetable API
const QUERY =
  "https://timetable.iit.artsci.utoronto.ca/api/20229/courses?section=F,S,Y";

module.exports = { QUERY };
