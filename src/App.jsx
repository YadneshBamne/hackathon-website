import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import TeamsInfoPage from "./pages/TeamInfoPage";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Teaminfopage" element={<TeamsInfoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
