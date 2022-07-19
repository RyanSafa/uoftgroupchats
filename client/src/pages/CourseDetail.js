import ReportModal from "../components/ReportModal";
import NewChatModal from "../components/NewChatModal";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "../styles/courseDetail.css";
const CourseDetail = (props) => {
  const params = useParams();
  const { code } = params;
  const [course, setCourse] = useState({});
  const [selectedLecture, setSelectedLecture] = useState("Common");
  const [groupchats, setGroupchats] = useState([]);
  const [courseFormOpen, setCourseFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchCourse = async () => {
      const response = await fetch(`/api/courses/${code}`);
      const data = await response.json();
      if (response.ok) {
        setCourse(data);
        setIsLoading(false);
      } else {
        throw new Error(data.message, { cause: data.status });
      }
    };

    fetchCourse().catch((error) => {
      setIsLoading(false);
      setHttpError({ message: error.message, status: error.cause });
    });
  }, [code]);

  const { id } = course;

  useEffect(() => {
    const fetchGroupchats = async () => {
      const response = await fetch(`/api/groupchats/${id}/${selectedLecture}`);
      const data = await response.json();
      if (response.ok) {
        setGroupchats(data);
      } else {
        throw new Error(data.message, { cause: data.status });
      }
    };
    if (id)
      fetchGroupchats().catch((error) => {
        setHttpError({ message: error.message, status: error.cause });
      });
  }, [id, selectedLecture]);

  if (isLoading) {
    return;
  }
  if (httpError) {
    return (
      <div>
        <p>Oops! {httpError.status} Error</p>
        <p>{httpError.message}</p>
      </div>
    );
  }

  return (
    <Container fluid>
      <Row
        style={{ backgroundColor: "#002a5c" }}
        className="justify-content-between align-items-center"
      >
        <Col className="text-white" sm={10}>
          <div className="px-5 py-3">
            <h1 className="font-weight-bold ">{course.code}</h1>
            <h3>{course.title}</h3>
          </div>
        </Col>
        <Col className="text-center" sm={2}>
          <Button className="add-groupchat">Add a Groupchat</Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xl="auto" className="my-3">
          <InputGroup>
            <InputGroup.Text>Lecture Session</InputGroup.Text>
            <DropdownButton
              variant="outline-primary-blue"
              onSelect={(eKey) => setSelectedLecture(eKey)}
              title={selectedLecture}
              id="input-group-dropdown-1"
              className="custom-squared-button"
            >
              <Dropdown.Item id="Common" key="Common" eventKey="Common">
                Common
              </Dropdown.Item>
              {course?.lectures?.map((lecture) => {
                return (
                  <Dropdown.Item id={lecture} key={lecture} eventKey={lecture}>
                    {lecture}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetail;
