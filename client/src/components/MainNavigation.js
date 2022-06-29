import fullLogo from "../logos/uoftgroupchatslogofull.PNG";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const MainNavigation = () => {
  return (
    <Navbar bg="primary-blue" variant="dark" expand="lg" sticky="top" className="mb-5">
      <Container className="justify-content-space-between">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={fullLogo}
            width="309"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="https://github.com/RyanSafa/uoftgroupchats" target="_blank">GitHub</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
