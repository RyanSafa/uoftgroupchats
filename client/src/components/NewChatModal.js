import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const NewChatModal = (props) => {
  const types = [
    "WhatsApp",
    "Discord",
    "Facebook Messenger",
    "Telegram",
    "Slack",
  ];
  const type_options = types.map((type) => <option key={type}>{type}</option>);
  const lecRef = useRef();
  const typeRef = useRef();
  const urlRef = useRef();
  const { courseId, showNewForm, handleNewFormClose, form_options } = props;

  const [validated, setValidated] = useState(true);

  const location = useLocation();

  const addChatHandler = async (event) => {
    event.preventDefault();
    if (urlRef.current.value === "") {
      setValidated(false);
    } else {
      const request_obj = {
        type: typeRef.current.value,
        link: urlRef.current.value,
        lecture: lecRef.current.value,
        courseId,
      };
      const response = await fetch("/api/groupchats/", {
        method: "POST",
        body: JSON.stringify(request_obj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setValidated(true);
        handleNewFormClose();
        props.setShowAlert(true);
      } else {
        console.log("OOPS");
        props.setShowError(true);
      }
    }
  };
  console.log(showNewForm);
  return (
    <Modal show={showNewForm} onHide={handleNewFormClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new groupchat!</Modal.Title>
      </Modal.Header>
      <Container>
        <Form onSubmit={addChatHandler}>
          <Form.Group className="mb-3" controlId="formSection">
            <Form.Label>Lecture Section</Form.Label>
            <Form.Select ref={lecRef} defaultValue={location.hash.substring(1)}>
              {form_options}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formType">
            <Form.Label>Groupchat Type</Form.Label>
            <Form.Select ref={typeRef}>{type_options}</Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formChatLink">
            <Form.Label>GroupChat Link</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://example.com"
              ref={urlRef}
              className={validated ? "" : "invalid-url"}
            />
            {!validated && (
              <p style={{ color: "red" }}>Please enter a valid URL</p>
            )}
          </Form.Group>
          <Button variant="secondary-blue" type="Submit" className="mb-4 mx-1">
            Save Changes
          </Button>
          <Button
            variant="secondary-red"
            onClick={handleNewFormClose}
            className="mb-4 mx-1"
          >
            Close
          </Button>
        </Form>
      </Container>
    </Modal>
  );
};

export default NewChatModal;
