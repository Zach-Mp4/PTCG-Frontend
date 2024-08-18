import "./NavBar.css";
import React from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <div>
      <Navbar expand="md" className="navbar-container">
        <NavLink exact to="/" className="navbar-brand">
          PTCG Collector
        </NavLink>

        <Nav className="nav-links ml-auto" navbar>
          <NavItem>
            <NavLink to="/cards" className="nav-link">
              Cards
            </NavLink>
          </NavItem>
          {!user ? (
            <>
              <NavItem>
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink to="/profile" className="nav-link">
                  {user.username}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={handleLogout} className="nav-link">
                  Logout
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;


