import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const NotFound = () => {
  return (
    <Container fluid>
      <Row className="my-5" style={{ backgroundColor: "#002a5c" }}>
        <Col className="text-white text-center py-5">
          <h1>Oops! 404 Error </h1>
          <h2>Page Not Found</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
