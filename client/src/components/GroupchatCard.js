import Card from "react-bootstrap/Card";
import classes from "./GroupchatCard.module.css";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import ReportModal from "./ReportModal";
import copySvg from "../svgs/copy.svg";

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
          <div>{type}</div>
        </Card.Header>
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Text className={classes.link}>
            <Card.Link href={link}>{link}</Card.Link>
          </Card.Text>
          <Card.Text className={classes.footer}>
            <small className="text-muted">Uploaded on {date} </small>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex align-items-center justify-content-between">
          <Button
            onClick={handleReportShow}
            className={`${classes.report} btn-sm `}
          >
            Report
          </Button>
          <div
            className="d-flex align-items-center"
            onClick={() => navigator.clipboard.writeText(link)}
            style={{
              cursor: "pointer",
            }}
          >
            <img src={copySvg} alt="copy" width="32" height="32" />
            <p className={`mb-0 ${classes.copy}`}>Copy</p>
          </div>
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
