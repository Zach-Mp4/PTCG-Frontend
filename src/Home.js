import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"

function Home({ user }) {
  return (
    <section className="home-container">
      <div className="welcome-text">
        <h1>WELCOME TO PTCG-COLLECTOR</h1>
        <h2>The Best Spot to Track Your Collection</h2>
      </div>
      {user ? (
        <h3 className="welcome-back">
          Welcome back to PTCG Collector, {user.username}!
        </h3>
      ) : (
        <div className="auth-buttons">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/register" className="btn register-btn">Register</Link>
        </div>
      )}
    </section>
  );
}

export default Home;

