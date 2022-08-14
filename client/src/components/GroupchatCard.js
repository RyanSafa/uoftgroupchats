import Card from "react-bootstrap/Card";
import classes from "./GroupchatCard.module.css";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import ReportModal from "./ReportModal";
import copySvg from "../svgs/clipboard2.svg";
import copiedSvg from "../svgs/clipboard2-check-fill.svg";
import whatsappLogo from "../logos/WhatsApp_logo.png";
import discordLogo from "../logos/Discord-Logo-Black.png";
import messengerLogo from "../logos/M_logo_Black.png";
import telegramLogo from "../logos/telegram_logo.png";
import slackLogo from "../logos/slackblacklogo.png";

const GroupchatCard = (props) => {
  const logos = {
    WhatsApp: whatsappLogo,
    Discord: discordLogo,
    Telegram: telegramLogo,
    Slack: slackLogo,
    "Facebook Messenger": messengerLogo,
  };

  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)

  const copyLink = (link) => {
    try {
      navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    }
    catch (e) {
      setCopyFailed(true)
    }
  }

  const [showReportModal, setShowReportModal] = useState(false);
  const { type, link, createdAt } = props.groupchat;
  const { handleReportAlert } = props;
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
          <img
            alt=""
            src={logos[type]}
            width="20"
            height="20"
            className="d-inline-block align-top"
          />{" "}
          {type}
        </Card.Header>
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Text className={classes.link}>
            <Card.Link href={link}>{link}</Card.Link>
          </Card.Text>
          <Card.Text className={classes.footer}>
            <small className="text-muted">Uploaded on {date} </small>
          </Card.Text>
        </Card.Body>
        <Card.Footer
          style={{ backgroundColor: "white" }}
          className="d-flex align-items-center justify-content-between"
        >
          <Button
            onClick={handleReportShow}
            className={`${classes.report} btn-sm `}
          >
            Report
          </Button>
          {!copied && !copyFailed && <div
            className="d-flex align-items-center"
            onClick={() => { copyLink(link) }}
            style={{
              cursor: "pointer",
            }}
          >
            <img src={copySvg} alt="copy" width="22" height="22" />
            <p className={`mb-0 ${classes.copy}`}>Copy</p>
          </div>}
          {copied && !copyFailed && <div
            className="d-flex align-items-center"
          >
            <img src={copiedSvg} alt="copied" width="22" height="22" />
            <p className='mb-0' style={{ fontSize: "0.75rem" }}>Copied!</p>
          </div>}
          {copyFailed && <p className='mb-0' style={{ fontSize: "0.75rem" }}>Browser not supported :( </p>}
          {/* <Button
            onClick={() => navigator.clipboard.writeText(link)}
            className="d-flex align-items-center"
          > <img src={copySvg} alt="copy" width="22" height="22" />
            Copy
          </Button> */}
        </Card.Footer>
      </Card>
      <ReportModal
        handleReportFormClose={handleReportClose}
        showReportForm={showReportModal}
        groupChat={props.groupchat}
        handleReportAlert={handleReportAlert}
      ></ReportModal>
    </>
  );
};

export default GroupchatCard;
