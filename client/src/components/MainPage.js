import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import chattingSVg from "../svgs/phone.svg";
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
                Find &amp; Upload Group Chats for Courses at the UofT St.George
                Campus
              </h3>
              <SearchBar />
            </div>
            <div className={"d-flex align-self-start flex-column"}>
              <Image
                fluid
                className={"w-100  flex-grow-1 px-5 d-none d-lg-block"}
                src={chattingSVg}
              />
              <p className={"text-center subtext mt-1 d-none d-lg-block"}>
                UofT GroupChats is not officially affiliated with the Univeristy
                of Toronto.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default MainPage;
