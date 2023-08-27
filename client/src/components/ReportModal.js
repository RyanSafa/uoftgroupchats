import React, { useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ReportModal = (props) => {
  const {
    handleReportFormClose,
    showReportForm,
    groupChat,
    handleReportAlert,
  } = props;
  const inputReason = useRef();
  const form_options = [
    "Dead or expired link.",
    "Malicious or irrelevant link.",
    "Duplicate link.",
  ].map((reason) => <option key={reason}>{reason}</option>);

  const reportHandler = async (event) => {
    event.preventDefault();
    const request = {
      reason: inputReason.current.value,
      groupchatId: groupChat.id,
    };
    try {
      const courseSearchAPI = process.env.REACT_APP_SERVER_URL ? 
      `${process.env.REACT_APP_SERVER_URL}/api/reports` 
      : `http://localhost:4000/api/reports`

      const response = await fetch(
        courseSearchAPI,
        {
          method: "POST",
          body: JSON.stringify(request),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.json();
      if (response.ok) {
        handleReportAlert(true, false, "Report Sent!");
        handleReportFormClose();
      } else {
        handleReportAlert(true, true, data.message || "Error");
        handleReportFormClose();
      }
    } catch (error) {
      handleReportAlert(true, true, "Uknown Error");
      handleReportFormClose();
    }
  };

  return (
    <Modal show={showReportForm} onHide={handleReportFormClose}>
      <Modal.Header closeButton>
        <Modal.Title>Report this Group Chat?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={reportHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              Why would you like to report this group chat?
            </Form.Label>
            <Form.Select ref={inputReason}>{form_options}</Form.Select>
          </Form.Group>
          <Modal.Footer>
            <Button
              variant="outline-primary-blue"
              type="Submit"
              style={{
                borderRadius: "0",
              }}
            >
              Save
            </Button>
            <Button
              variant="outline-secondary-red"
              onClick={handleReportFormClose}
              style={{
                borderRadius: "0",
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReportModal;
