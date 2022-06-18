import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourseDetail from './pages/CourseDetail';
import MainNavigation from './components/MainNavigation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainNavigation></MainNavigation>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:code' element={<CourseDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;