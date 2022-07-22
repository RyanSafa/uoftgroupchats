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
  const lecRef = useRef();
  const typeRef = useRef();
  const urlRef = useRef();

  const {
    courseId,
    showNewForm,
    handleNewFormClose,
    lectures,
    selectedLecture,
    reloadGroupchats,
  } = props;

  const addChatHandler = async (event) => {
    event.preventDefault();
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
      handleNewFormClose();
      props.setShowAlert(true);
      reloadGroupchats(lecRef.current.value, courseId);
    } else {
      props.setShowError(true);
    }
  };
  return (
    <Modal show={showNewForm} onHide={handleNewFormClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Group Chat!</Modal.Title>
      </Modal.Header>
      <Container>
        <Form onSubmit={addChatHandler} noValidate>
          <Form.Group className="mb-3" controlId="formSection">
            <Form.Label>Lecture Section:</Form.Label>
            <Form.Select ref={lecRef} defaultValue={selectedLecture}>
              {lectures.map((lec) => {
                return (
                  <option value={lec} key={lec}>
                    {lec}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formType">
            <Form.Label>Groupchat Type:</Form.Label>
            <Form.Select ref={typeRef}>
              {types.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formChatLink">
            <Form.Label>Group Chat Link:</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://example.com"
              ref={urlRef}
            />
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
