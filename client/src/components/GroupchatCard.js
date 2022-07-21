import Card from "react-bootstrap/Card";
import classes from "./GroupchatCard.module.css";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import ReportModal from "./ReportModal";

const GroupchatCard = (props) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const { type, link, createdAt } = props.groupchat;
  const date = new Date(createdAt)
    .toDateString()
    .split(" ")
    .slice(1)
    .toString()
    .replaceAll(",", " ");

  const handleReportShow = () => {
    setShowReportModal(true);
  };
  const handleReportClose = () => setShowReportModal(false);
  return (
    <>
      <Card className={`h-100 ${classes.square}`}>
        <Card.Header className="text-left text-primary-black fw-bold">
          {type}
        </Card.Header>
        <Card.Body>
          <Card.Text className={classes.link}>
            <Card.Link href={link}>{link}</Card.Link>
          </Card.Text>
          <Card.Text className={classes.footer}>
            <small className="text-muted">Uploaded on {date} </small>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="" style={{ backgroundColor: "white" }}>
          <Button
            onClick={handleReportShow}
            className={`${classes.report} btn-sm `}
          >
            Report
          </Button>
        </Card.Footer>
      </Card>
      <ReportModal
        handleReportFormClose={handleReportClose}
        showReportForm={showReportModal}
        gc={props.groupchat}
      ></ReportModal>
    </>
  );
};

export default GroupchatCard;
