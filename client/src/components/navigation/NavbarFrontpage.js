import React from 'react';
import { Link, Route } from 'react-router-dom';

const NavbarFrontpage = () => {
  return (
    <nav className="nav-style">
      <div className="logoHeader">
        <Link to="/" className="homeLink navLink" style={{ textDecoration: 'none' }}>
          <div><img src="../../images/logo2Gobuddy.png" className="logo-small" /> </div>
          <div><h2 className="nav-title">GoBuddy</h2></div>
          </Link>
      </div>
      <div className="nav-link-wrapper-front">
        <Link to="/signup/buddy" className=" navLink">Sign up as a buddy </Link>
        <Link to="/signup/tiger" className=" navLink">Sign up as a tiger</Link>
        <Link to="/login" className=" navLink">Login</Link>
        <Link to='/about' className="aboutLink navLink" style={{ textDecoration: 'none' }}> About Us</Link>
        {/* <Route exact path='/support' component={Support}>Support</Route> */}
      </div>
    </nav>
  )
}

export default NavbarFrontpage;

