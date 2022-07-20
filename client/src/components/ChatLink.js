import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import whatsappLogo from "../logos/WhatsApp_logo.webp";
import discordLogo from "../logos/discord-logo.png";
import messengerLogo from "../logos/messenger_logo.jpg";
import telegramLogo from "../logos/telegram_logo.webp";
import slackLogo from "../logos/Slack_logo.png";

const ChatLink = (props) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(props.updatedAt);

  const logos = {
    WhatsApp: whatsappLogo,
    Discord: discordLogo,
    Telegram: telegramLogo,
    Slack: slackLogo,
    "Facebook Messenger": messengerLogo,
  };

  return (
    <Col>
      <Card
        border="secondary-blue"
        style={{ width: "18rem" }}
        text={props.type === "Facebook Messenger" ? "Messenger" : props.type}
        className="my-2"
      >
        <Card.Header as="h5">
          {props.type}{" "}
          <img
            alt=""
            src={logos[props.type]}
            width="25"
            height="25"
            className="d-inline-block align-top"
          />
        </Card.Header>
        <Card.Body>
          <Card.Title as="p">
            {" "}
            <a href={`${props.link}`}>{props.link}</a>
          </Card.Title>
          {props.inSections && (
            <Button
              variant="outline-secondary-blue"
              className="mx-3 mt-2"
              onClick={() => {
                navigator.clipboard.writeText(props.link);
              }}
            >
              COPY
            </Button>
          )}
          {props.inSections && (
            <Button
              variant="outline-secondary-red"
              className="mx-3 mt-2"
              onClick={() => {
                props.handleReportFormShow({
                  id: props.id,
                  type: props.type,
                  link: props.link,
                  updatedAt: props.updatedAt,
                });
              }}
            >
              REPORT
            </Button>
          )}
        </Card.Body>
        <Card.Footer className="text-muted">
          Created on {monthNames[date.getUTCMonth()]} {date.getDate()},{" "}
          {date.getFullYear()}
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ChatLink;
