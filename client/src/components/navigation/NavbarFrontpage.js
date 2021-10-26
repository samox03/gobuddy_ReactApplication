import React from 'react';
import { Link, Route } from 'react-router-dom';

const NavbarFrontpage = () => {
  return (
    <nav className="nav-style">

      <Link to="/signup/buddy" >Sign up as a buddy </Link>
      <Link to="/signup/tiger" >Sign up as a tiger</Link>
      <Link to="/login" >Login</Link>

      <Link to='/about' className="aboutLink navLink" style={{ textDecoration: 'none' }}> About Us</Link>
      {/* <Route exact path='/support' component={Support}>Support</Route> */}

    </nav>
  )
}

export default NavbarFrontpage;

