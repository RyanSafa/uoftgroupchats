import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import chattingSVg from "../svgs/phone.svg";
import "../styles/MainPage.css";
import SearchBar from "./SearchBar";

const MainPage = () => {
  return (
    <>
      <section className={"p-5"}>
        <Container>
          <div className={"d-sm-flex"}>
            <div>
              <h1
                className="title gradient-text"
                style={{ fontSize: "3.5rem" }}
              >
                Welcome to UofT GroupChats!
              </h1>
              <h3 className={"mt-4"} style={{ fontSize: "1.5rem" }}>
                Find &amp; Upload Group Chats for Your Courses at the UofT
                St.George Campus
              </h3>
              <SearchBar />
            </div>
            <div className={"d-flex align-self-start"}>
              <Image
                fluid
                className={"w-50  flex-grow-1 px-5  d-none d-lg-block"}
                src={chattingSVg}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default MainPage;
