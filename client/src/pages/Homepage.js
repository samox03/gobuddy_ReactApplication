import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render() {
    return (
      <div id="body">
        <div id="header-front">
          <div>
            <img src="../../images/logo2Gobuddy.png" alt="Logo" className="logo-large" className="logo-large" />
          </div>
          <div>
            <div>
              <h1>Welcome to GoBuddy</h1>
            </div>
            <div>
              <h3>Become a verified Buddy and help people around you in need!
              </h3>
            </div>
            <div className="joinOption-Wrapper">
              {/* Signup as buddy or tiger, button components */}
              <Link to="/signup/buddy" style={{ textDecoration: 'none' }} className="basic-btn" >Sign up as a buddy </Link>
              <Link to="/signup/tiger" style={{ textDecoration: 'none' }} className="basic-btn" >Sign up as a tiger</Link>
            </div>
            <div className="login-option-start">
              <p>Already have an account?</p>
              {/* LoginButton Component */}
              <Link to="/login" style={{ textDecoration: 'none' }} >Login</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}