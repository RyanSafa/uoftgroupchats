import Card from "react-bootstrap/Card";

const GroupchatCard = (props) => {
  const { type, link, createdAt } = props;
  const date = new Date(createdAt)
    .toDateString()
    .split(" ")
    .slice(1)
    .toString()
    .replaceAll(",", " ");
  return (
    <Card>
      <Card.Header className="text-left">{type}</Card.Header>
      <Card.Body>
        <Card.Text>
          <a href={link}> {link} </a>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted"> Uploaded: {date} </small>
      </Card.Footer>
    </Card>
  );
};

export default GroupchatCard;
