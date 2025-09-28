import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import TeamsInfoPage from "./pages/TeamInfoPage";
import Tracks from "./pages/Tracks";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Teaminfopage" element={<TeamsInfoPage />} />
          <Route path="/tracks" element={<Tracks />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
