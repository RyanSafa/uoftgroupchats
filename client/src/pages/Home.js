import React from "react";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
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
      <SearchBar formSubmissionHandler={formSubmissionHandler}></SearchBar>
      {/* <CourseList searchResult={searchResult} /> */}
    </>
  );
};

export default Home;
