import fullLogo from "./uoftgroupchatslogofull.PNG";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const MainNavigation = () => {
  return (
    <Navbar bg="primary-blue" variant="dark" expand="lg">
      <Container className="justify-content-space-between">
        <a class="navbar-brand" href="/">
          <img src={fullLogo} width="300" height="50" alt="" />
        </a>
        <Nav>
          <Nav.Link href="https://github.com/RyanSafa/uoftgroupchats" target="_blank">GitHub</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
