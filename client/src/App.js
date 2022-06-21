import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CourseDetail from "./pages/CourseDetail";
import MainNavigation from "./components/MainNavigation";
function App() {
  return (
    <div className="App">
      <BrowserRouter disableGutters="true">
        <MainNavigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses/:code" element={<CourseDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
