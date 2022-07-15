import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import phone_icon from "../svgs/chat_box.svg";
const MainNavigation = () => {
  return (
    <>
      <Navbar bg="secondary-blue" variant="dark" expand="lg" sticky="top">
        <Container className="justify-content-space-between">
          <Navbar.Brand href="/">
            UofT GroupChats
            <img
              src={phone_icon}
              width="30"
              height="30"
              className="d-inline-block align-top mx-2"
              alt="React Bootstrap logo"
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
