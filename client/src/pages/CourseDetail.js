import NewChatModal from "../components/NewChatModal";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import GroupchatCard from "../components/GroupchatCard";
import Alert from "react-bootstrap/Alert";
import "../styles/courseDetail.css";
const CourseDetail = (props) => {
  const params = useParams();
  const { code } = params;
  const [course, setCourse] = useState({
    code: "",
    createdAt: "",
    id: "",
    lectures: [],
    title: "",
    updatedAt: "",
  });
  const [selectedLecture, setSelectedLecture] = useState("Unspecified Lecture");
  const [groupchats, setGroupchats] = useState([]);
  const [showGroupChatModal, setShowGroupChatModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGroupchatLoading, setIsGroupchatLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const [alert, setAlert] = useState({
    showAlert: false,
    isError: false,
    msg: "",
  });
  const [validated, setValidated] = useState(false);

  const handleAlert = (showAlert, isError, msg) => {
    console.log(isError, msg);
    setAlert({ showAlert, isError, msg });
  };
  const [reportAlert, setReportAlert] = useState({
    showAlert: false,
    isError: false,
    msg: "",
  });

  const handleReportAlert = (showAlert, isError, msg) => {
    setAlert({ showAlert, isError, msg });
  };
  const reloadGroupchats = (lec, id) => {
    if (lec === selectedLecture) {
      setIsGroupchatLoading(true);
      const fetchGroupchats = async () => {
        const response = await fetch(`/api/groupchats/${id}/${lec}`);
        const data = await response.json();
        if (response.ok) {
          setGroupchats(data);
          setIsGroupchatLoading(false);
        } else {
          throw new Error(data.message, { cause: data.status });
        }
      };
      if (id)
        fetchGroupchats().catch((error) => {
          setIsGroupchatLoading(false);
          setHttpError({ message: error.message, status: error.cause });
        });
    } else {
      setSelectedLecture(lec);
    }
  };
  const handleGroupChatShow = () => {
    setShowGroupChatModal(true);
  };
  const handleGroupChatClose = () => {
    setShowGroupChatModal(false);
    setValidated(false);
  };

  const handleValidation = () => {
    setValidated(true);
  };
  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`/api/courses/${code}`);
      const data = await response.json();
      if (response.ok) {
        setIsLoading(false);
        setCourse(data);
      } else {
        throw new Error(data.message, { cause: data.status });
      }
    };

    fetchCourse().catch((error) => {
      setIsLoading(false);
      setHttpError({ message: error.message, status: error.cause });
    });
  }, [code]);

  const { id, lectures } = course;

  useEffect(() => {
    setIsGroupchatLoading(true);
    const fetchGroupchats = async () => {
      const response = await fetch(`/api/groupchats/${id}/${selectedLecture}`);
      const data = await response.json();
      if (response.ok) {
        setGroupchats(data);
        setIsGroupchatLoading(false);
      } else {
        throw new Error(data.message, { cause: data.status });
      }
    };
    if (id)
      fetchGroupchats().catch((error) => {
        setIsGroupchatLoading(false);
        setHttpError({ message: error.message, status: error.cause });
      });
  }, [id, selectedLecture]);
  // if (isLoading) {
  //   return <div>Loading</div>;
  // }

  // if (isGroupchatLoading) {
  //   return <div>Loading Groupchats</div>;
  // }
  if (httpError) {
    return (
      <div>
        <p>Oops! {httpError.status} Error</p>
        <p>{httpError.message}</p>
      </div>
    );
  }
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
                Add a Group Chat
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col xs="auto" className="my-3 text-center">
            <InputGroup>
              <InputGroup.Text>Lecture Session</InputGroup.Text>
              <DropdownButton
                variant="outline-primary-blue"
                onSelect={(eKey) => setSelectedLecture(eKey)}
                title={selectedLecture}
                id="input-group-dropdown-1"
                className=""
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
      <Container className="mb-4">
        {alert.showAlert && (
          <Alert
            onClose={() =>
              setAlert({ showAlert: false, isError: false, msg: "" })
            }
            variant={`${alert.isError ? "secondary-red" : "WhatsApp"}`}
            className="d-flex align-items-center"
            dismissible
            role="alert"
          >
            {alert.isError && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-exclamation-octagon  flex-shrink-0 me-2"
                viewBox="0 0 16 16"
              >
                <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
              </svg>
            )}
            {!alert.isError && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-check2-all flex-shrink-0 me-2"
                viewBox="0 0 16 16"
              >
                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
              </svg>
            )}
            <div>{alert.msg}</div>
          </Alert>
        )}
        {reportAlert.showAlert && (
          <Alert
            onClose={() =>
              setReportAlert({ showAlert: false, isError: false, msg: "" })
            }
            variant={`${reportAlert.isError ? "secondary-red" : "WhatsApp"}`}
            className="d-flex align-items-center"
            dismissible
            role="alert"
          >
            {alert.isError && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-exclamation-octagon  flex-shrink-0 me-2"
                viewBox="0 0 16 16"
              >
                <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
              </svg>
            )}
            {!reportAlert.isError && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-check2-all flex-shrink-0 me-2"
                viewBox="0 0 16 16"
              >
                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
              </svg>
            )}
            <div>{reportAlert.msg}</div>
          </Alert>
        )}
        <Row
          className={`${
            groupchats.length > 0
              ? "row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4"
              : ""
          }`}
        >
          {groupchats?.length > 0 &&
            !isGroupchatLoading &&
            groupchats?.map((gc) => {
              return (
                <Col className="" key={gc.id}>
                  <GroupchatCard
                    handleReportAlert={handleReportAlert}
                    groupchat={gc}
                  ></GroupchatCard>
                </Col>
              );
            })}

          {groupchats?.length === 0 && !isGroupchatLoading && (
            <Col className="text-center">
              <h2 className="no-course-found">
                No Group Chats Found. Please Add one if you can!
              </h2>
            </Col>
          )}
        </Row>
      </Container>
      <NewChatModal
        showNewForm={showGroupChatModal}
        handleNewFormClose={handleGroupChatClose}
        lectures={lectures}
        selectedLecture={selectedLecture}
        reloadGroupchats={reloadGroupchats}
        courseId={id}
        handleValidation={handleValidation}
        validated={validated}
        handleAlert={handleAlert}
      ></NewChatModal>
    </>
  );
};

export default CourseDetail;
