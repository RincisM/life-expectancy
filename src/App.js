import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashPage from "./SplashPage";
import QuestionsPage from "./QuestionsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
