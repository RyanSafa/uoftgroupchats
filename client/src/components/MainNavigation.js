import fullLogo from "./uoftgroupchatslogofull.PNG";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const MainNavigation = () => {
  return (
    <Navbar bg="primary-blue" variant="dark" expand="lg">
      <Container className="justify-content-space-between">
        <Navbar.Brand href="#home">UofT Groupchats</Navbar.Brand>
        <Nav>
          <Nav.Link href="#link">GITHUB</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
