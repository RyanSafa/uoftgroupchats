import React from "react";
import { useState } from "react";
import Lookup from "../components/Lookup";
import CourseList from "../components/CourseList";

const Home = () => {
  const [searchResult, setSearchResult] = useState([]);

  const formSubmissionHandler = async (courseSent) => {
    const response = await fetch(`/api/search/${courseSent}`);
    const data = await response.json();
    setSearchResult(data);
    console.log(data[0].code);
  };

  return (
    <>
      <Lookup formSubmissionHandler={formSubmissionHandler}></Lookup>
      <CourseList searchResult={searchResult} />
    </>
  );
};

export default Home;
