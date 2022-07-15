import useDebounce from "../hooks/useDebounce";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import chattingSVg from "../chatting_svg.svg";
import "./SearchBar.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/";
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
  return (
    <>
      <section className={"p-5"}>
        <Container>
          <div className={"d-sm-flex"}>
            <div>
              <h1 className="title" style={{ fontSize: "3.5rem" }}>
                Welcome to UofT Group Chats!
              </h1>
              <h3 className={"my-3"} style={{ fontSize: "1.5rem" }}>
                Find &amp; Upload Group Chats for your courses at the UofT
                St.George Campus
              </h3>
              <Form className={"pt-5"}>
                <Form.Group controlId="searchInput">
                  <Form.Label className={"m-0"}>
                    <h4 className={"my-2"}>Search for a Course</h4>
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
            </div>
            <div className={"d-flex align-self-start"}>
              <Image
                fluid
                className={"w-50  flex-grow-1 px-5  d-none d-sm-block"}
                src={chattingSVg}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default SearchBar;
