import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Box, ThemeProvider } from "@mui/material";
import theme from "./components/Theme";
import CourseDetail from "./pages/CourseDetail";
import MainNavigation from "./components/MainNavigation";

function App() {
  return (
    <div className="App">
      <BrowserRouter disableGutters="true">
        <ThemeProvider theme={theme}>
          <MainNavigation></MainNavigation>
          <Container>
            <Box
              minHeight="100vh"
              display="flex"
              bgcolor="secondary"
              disableGutters="true"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses/:code" element={<CourseDetail />} />
              </Routes>
            </Box>
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
