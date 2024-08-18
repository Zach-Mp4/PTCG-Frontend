import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"

function NotFound() {
  return (
    <section className="home-container">
      <div className="welcome-text">
        <h1>404 Page Not Found</h1>
        <h2><Link to="/">Home</Link></h2>
      </div>
    </section>
  );
}

export default NotFound;
