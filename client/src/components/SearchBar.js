import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Typography, Autocomplete, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import './SearchBar.css'

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [values, setValues] = useState([]);
  useEffect(() => {
    const fetchData = async (inputValue) => {
      const response = await fetch(`/api/search/${inputValue}`);
      const data = await response.json();
      const courseList = [];
      for (const course of data) {
        courseList.push(course.code);
      }
      setValues(courseList);
    };

    if (inputValue.length > 3) {
      fetchData(inputValue);
    }
  }, [inputValue]);
  return (
    <Fragment>
      <Typography
        variant="h2"
        color="white"
        sx={{ fontWeight: "bold", textAlign: "center", fontSize: "50px" }}
      >
        Find groupchats for your courses!
      </Typography>
      <Autocomplete
        inputValue={inputValue}
        onInputChange={(e) => setInputValue(e.target.value)}
        id="search-course-code"
        getOptionLabel={(option) => {
          return option
        }}
        options={values}
        freeSolo={true}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
        open={inputValue.length > 3}
        fullWidth={true}
        disableClearable={true}
        renderOption={(props, option, state) => (
          <>
            <Link to={`/courses/${option}`} {...props} >{option}</Link>
          </>
        )}
      />
    </Fragment>
  );
};

export default SearchBar;
