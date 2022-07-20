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
import GroupchatCard from "../components/GroupchatCard";
import "../styles/courseDetail.css";
const CourseDetail = (props) => {
  const params = useParams();
  const { code } = params;
  const [course, setCourse] = useState({});
  const [selectedLecture, setSelectedLecture] = useState("Unspecified Lecture");
  const [groupchats, setGroupchats] = useState([]);
  const [showGroupChatModal, setShowGroupChatModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleGroupChatShow = () => {
    setShowGroupChatModal(true);
  };
  const handleGroupChatClose = () => setShowGroupChatModal(false);
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

  const form_options = course?.lectures?.map((lec) => (
    <option key={lec}>{lec}</option>
  ));
  console.log(groupchats);
  return (
    <>
      <div
        className="jumbotron jumbotron-fluid"
        style={{ backgroundColor: "#002a5c" }}
      >
        <Container>
          <Row className="justify-content-between">
            <Col md={10} className="text-white py-2 my-auto course-title">
              <div className="">
                <h1 className="font-weight-bold ">{course.code}</h1>
                <h3>{course.title}</h3>
              </div>
            </Col>
            <Col
              md={2}
              className=" my-md-auto text-center lower-button-padding "
            >
              <Button onClick={handleGroupChatShow} className="add-groupchat">
                Add a Groupchat
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs="auto" className="my-3 text-center">
            <InputGroup>
              <InputGroup.Text>Lecture Session</InputGroup.Text>
              <DropdownButton
                variant="outline-primary-blue"
                onSelect={(eKey) => setSelectedLecture(eKey)}
                title={selectedLecture}
                id="input-group-dropdown-1"
                className="custom-squared-button"
              >
                {course?.lectures?.map((lecture) => {
                  return (
                    <Dropdown.Item
                      id={lecture}
                      key={lecture}
                      eventKey={lecture}
                    >
                      {lecture}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </InputGroup>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="row-cols-2 row-cols-md-4 g-4">
          {groupchats?.map((gc) => {
            return (
              <Col key={gc.id}>
                <GroupchatCard
                  type={gc.type}
                  link={gc.link}
                  createdAt={gc.createdAt}
                ></GroupchatCard>
              </Col>
            );
          })}
        </Row>
      </Container>
      <NewChatModal
        showNewForm={showGroupChatModal}
        handleNewFormClose={handleGroupChatClose}
        form_options={form_options}
        setShowAlert={setShowAlert}
        setShowError={setShowError}
      ></NewChatModal>
    </>
  );
};

export default CourseDetail;
