import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import LoadingSpinner from './components/LoadingSpinner';
import "./App.css";

const CourseDetail = React.lazy(() => import('./pages/CourseDetail'))
const Home = React.lazy(() => import('./pages/Home'))

function App() {
  return (
    <div className="App">
      <BrowserRouter disableGutters="true">
        <MainNavigation />
        <Suspense
          fallback={
            <div className='centered'>
              <LoadingSpinner></LoadingSpinner>
            </div>
          }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses/:code" element={<CourseDetail />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
