import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render() {
    return (
      <div id="header">
      <div>
        <div>
          <img src="../../images/logo2Gobuddy.png" alt="Logo" class="logo-large" className="logo-large" />
        </div>
        <div>
          <div>
            <h1>Welcome to GoBuddy</h1>
          </div>
          <div>
            <h3>Become a verified Buddy and help people around you in need!
            </h3>
          </div>
          <div class="joinOption-Wrapper">
            {/* Signup as buddy or tiger, button components */}
            <Link to="/signup/buddy" style={{ textDecoration: 'none' }} className="signup-btn" >Sign up as a buddy </Link>
            <Link to="/signup/tiger" style={{ textDecoration: 'none' }} className="signup-btn" >Sign up as a tiger</Link>
          </div>
          <div class="login-option-start">
            Already have an account?
            {/* LoginButton Component */}
            <Link to="/login" style={{ textDecoration: 'none' }} >Login</Link>
          </div>
        </div>
        </div>
      </div>
    )
  }
}