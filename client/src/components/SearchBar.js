import useDebounce from "../hooks/useDebounce";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

const SearchBar = (props) => {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  // fetch courses
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/courses/search/${debouncedSearch}`);
      const data = await response.json();
      const courseList = [];
      for (const course of data) {
        courseList.push(course);
      }
      setCourses(courseList);
      setIsLoading(false);
    };

    if (debouncedSearch) {
      setIsLoading(true);
      fetchData();
    }
  }, [debouncedSearch]);

  return (
    <Form
      className={!props.isPhone ? "pt-4" : "pt-1"}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Form.Group controlId="searchInput">
        <Form.Label className={"mt-1 p-0"}>
          {!props.isPhone && (
            <h5 className={"my-0 p-0"}>Search for a Course</h5>
          )}
          {props.isPhone && <h6 className={"my-0 p-0"}>Search for a Course</h6>}
        </Form.Label>
        <Form.Control
          style={{
            borderRadius: "0",
            fontSize: props.isPhone ? "0.7rem" : "1rem",
          }}
          type="text"
          placeholder="Course Code (e.g. MAT137)"
          onChange={(e) => setSearch(e.target.value)}
        />
        {!isLoading && debouncedSearch.length > 1 && (
          <ListGroup style={{ borderRadius: "0" }}>
            {courses.map((course) => {
              return (
                <ListGroup.Item
                  action
                  href={`/courses/${course.code}`}
                  variant="secondary-blue"
                  key={course.id}
                  style={{ fontSize: props.isPhone ? "0.7rem" : "1rem" }}
                >
                  <span className="fw-bold">{course.code}</span> -{" "}
                  {course.title}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
        {!isLoading && courses.length === 0 && debouncedSearch.length > 1 && (
          <ListGroup>
            <ListGroup.Item key="-1">
              <span className="fw-bold">No Course Found</span>
            </ListGroup.Item>
          </ListGroup>
        )}
      </Form.Group>
    </Form>
  );
};

export default SearchBar;
