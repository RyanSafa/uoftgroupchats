import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import chat_icon from "../svgs/chat_box.svg";
import "../styles/MainNavigation.css";
const MainNavigation = () => {
  return (
    <>
      <Navbar bg="secondary-blue" variant="dark" expand="lg" sticky="top">
        <Container className="justify-content-space-between">
          <Navbar.Brand href="/" className="no-hover">
            UofT GroupChats
            <img
              src={chat_icon}
              width="30"
              height="30"
              className="d-inline-block align-top mx-2 filter-white"
              alt="Chat icon"
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
