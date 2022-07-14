import useDebounce from "../hooks/useDebounce";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import "./SearchBar.css";
const SearchBar = () => {
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
  console.log(isLoading);
  return (
    <Container
      fluid
      className={"d-flex flex-grow-1 align-items-center justify-content-center"}
    >
      <Form>
        <Form.Group controlId="searchInput">
          <Form.Label>
            <h3>
              Welcome to UoftGroupchats! A Website to find Group Chats for your
              courses at UofT. Search for a Course!
            </h3>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Course Code (e.g. MAT137)"
            onChange={(e) => setSearch(e.target.value)}
          />
          {debouncedSearch.length > 1 && (
            <ListGroup>
              {courses.map((course) => {
                return (
                  <ListGroup.Item
                    action
                    href={`/courses/${course.code}`}
                    variant="secondary-blue"
                    key={course.id}
                  >
                    <span className="fw-bold">{course.code}</span> -{" "}
                    {course.title}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
          {courses.length === 0 && debouncedSearch.length > 1 && (
            <ListGroup>
              <ListGroup.Item key="-1">
                {console.log("rendered")}
                <span className="fw-bold">No such course found.</span>
              </ListGroup.Item>
            </ListGroup>
          )}
        </Form.Group>
      </Form>
    </Container>
  );
};

export default SearchBar;
