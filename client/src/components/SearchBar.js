import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [values, setValues] = useState([]);
  useEffect(() => {
    const fetchData = async (inputValue) => {
      const response = await fetch(`/api/search/${inputValue}`);
      const data = await response.json();
      const courseList = [];
      for (const course of data) {
        courseList.push(course);
      }
      setValues(courseList);
    };

    if (inputValue.length >= 3) {
      fetchData(inputValue);
    } else {
      setValues([]);
    }
  }, [inputValue]);

  return (
    <Container
      className="d-flex flex-grow-1 flex-column align-items-center justify-content-center "
      fluid
    >
      <Card
        className="p-4"
        bg="primary-blue"
        border="primary-blue"
        text="white"
      >
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              <h1>Find groupchats for your courses!</h1>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Course Code (e.g. MAT137)"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <ListGroup>
              {values.map((value) => {
                return (
                  <ListGroup.Item
                    action
                    href={`/courses/${value.code}`}
                    variant="secondary-blue"
                    key={value.id}
                  >
                    <span className="fw-bold">{value.code}</span> -{" "}
                    {value.title}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
};

export default SearchBar;
