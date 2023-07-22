import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const SplashPage = () => {
  return (
    <div className="splash-container">
      <h1>Want to know the Quality of the Water?</h1>
      <Link to="/questions" className="link-button">
        Click Here
      </Link>
    </div>
  );
};

export default SplashPage;
