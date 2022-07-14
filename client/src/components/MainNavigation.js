import fullLogo from "../logos/uoftgroupchatslogofull.PNG";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const MainNavigation = () => {
  return (
    <>
      <Navbar bg="secondary-blue" variant="dark" expand="lg" sticky="top">
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
            <Nav.Link
              href="https://github.com/RyanSafa/uoftgroupchats"
              target="_blank"
            >
              GitHub
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <hr
        style={{ height: "2px", margin: "0", color: "black", opacity: "100" }}
      />
    </>
  );
};

export default MainNavigation;
