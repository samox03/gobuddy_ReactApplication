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
            <h1 className="front-title heading-font">Welcome to GoBuddy</h1>
          </div>
          <div className="front-subtitle-wrap">
            <h2 className="front-subtitle">Become a verified Buddy and help people around you in need!
            </h2>
          </div>
          <div className="joinOption-Wrapper">
            {/* Signup as buddy or tiger, button components */}
            <Link to="/signup/buddy" style={{ textDecoration: 'none' }} className="basic-btn-front" >Sign up as a buddy </Link>
            <Link to="/signup/tiger" style={{ textDecoration: 'none' }} className="basic-btn-front" >Sign up to get help</Link>
          </div>
          <div className="login-option-start">
           <div><p>Already have an account?</p></div> 
            <div><Link to="/login" style={{ textDecoration: 'none' }} >Login</Link></div>
          </div>
        </div>
        {/* <div id="bottom-page-front">
          <div className="citation-front">
            <div className="text-wrap-1">"Soziale Ungleichheit beschreibt den Zustand, wenn Menschen aus gesellschaftlichen Gründen über bestimmte Ressourcen oder Lebensbedingungen mehr oder weniger verfügen. Aufgrund dieses Zustands haben sie regelmäßig bessere oder schlechtere Lebens- und Verwirklichungschancen."</div>
            <div className="text-wrap-2">"Optimismus ist eine Strategie für eine bessere Zukunft. Denn wenn Sie nicht glauben, dass die Zukunft besser sein kann, dann werden sie auch nicht aufstehen und die Verantwortung dafür übernehmen."</div>
          </div>
        </div> */}
      </div>
    )
  }
}