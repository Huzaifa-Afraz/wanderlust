import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Flash from "./components/Flash";
import ShowListing from './components/ShowListing';
import Index from './components/Index';
import './App.css';
import LoginForm from './components/user/Login';
import SignUp from './components/user/Signup';
import NewListing from "./components/NewListing"
export default function App() {
  const successMessage = "Welcome to Wanderlust!";
  const errorMessage = "";
  const currentUser = null; 

  return (
    <Router>
    <div>
      {/* Navbar, Flash, and Footer are placed outside the Routes wrapper */}
      <Navbar currUser={currentUser} />
      {/* <Flash success={successMessage} error={errorMessage} /> */}
      
      {/* Routes for different components */}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp/>} />
        {/* Add any other routes you may have */}
        <Route path="/listings" element={<Index />} />
        <Route path="/" element={<Index />} />
        <Route path="/listings/:id" element={<ShowListing/>} />
        <Route path="/listings/new" element={<NewListing/>} />
      </Routes>
      
      <Footer />
    </div>
  </Router>
  )
}
