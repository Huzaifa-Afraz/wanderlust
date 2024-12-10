// Navbar.js
import React from "react";
import "./Navbar.css"; // Style extracted into a CSS file for better React practices.

const Navbar = () => {
  const currUser=localStorage.getItem('token');
  const handleLogout = () => {
    // Remove token and user from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userid');
  
    // Optionally, redirect the user to another page, such as the login page
    window.location.href = '/login'; // or use your routing method
  };
  return (
    <nav className="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/listings">
          <i className="fa-regular fa-compass"></i>
        </a>
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
            <a className="nav-link" href="/listings">
              Explore
            </a>
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
            <a className="nav-link" href="/listings/new">
              Rent Home
            </a>
            {!currUser ? (
              <>
                <a className="nav-link" href="/signup">
                  <b>Sign Up</b>
                </a>
                <a className="nav-link" href="/login">
                  <b>Login</b>
                </a>
              </>
            ) : (
              // <span className="nav-link pointer" onClick={handleLogout}><b className="cursor-pointer">Logout</b></span>
              <a className="nav-link" onClick={handleLogout}>
                <b>Logout</b>
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
