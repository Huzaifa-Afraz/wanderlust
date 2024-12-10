// Navbar.js
import React from "react";
import "./Navbar.css"; // Style extracted into a CSS file for better React practices.
import { Link } from "react-router-dom";
const Navbar = () => {
  const currUser = localStorage.getItem("token");
  const handleLogout = () => {
    // Remove token and user from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userid");

    // Optionally, redirect the user to another page, such as the login page
    window.location.href = "/login"; // or use your routing method
  };
  return (
    <nav className="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/listings">
          <i className="fa-regular fa-compass"></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/listings">
              Explore
            </Link>
          </div>
          {/* Search Bar Example */}
          {/* <div className="navbar-nav ms-auto">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2 search-inp"
                type="search"
                placeholder="Search destinations"
              />
              <button className="btn search-btn" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>Search
              </button>
            </form>
          </div> */}
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/listings/new">
              Rent Home
            </Link>
            {!currUser ? (
              <>
                <Link className="nav-link" to="/signup">
                  <b>Sign Up</b>
                </Link>
                <Link className="nav-link" to="/login">
                  <b>Login</b>
                </Link>
              </>
            ) : (
              // <span className="nav-link pointer" onClick={handleLogout}><b className="cursor-pointer">Logout</b></span>
              <Link className="nav-link" onClick={handleLogout}>
                <b>Logout</b>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
