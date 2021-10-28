import React from 'react';
import { Link } from 'react-router-dom';
import AboutUs from '../index/AboutUs';
import NavbarFrontpage from './NavbarFrontpage'


const NavbarTiger = (props) => {

  if (props.userInSession) {
    return (
      <nav className="nav-style">
        <div>
          <div className="logoHeader">
            <img src="../../images/logo2Gobuddy.png" class="logo-small" />
          </div>
          <Link to="/auth/tigerView" className="homeLink" style={{ textDecoration: 'none' }}>
            <h2>Welcome, {props.userInSession.username} !</h2> </Link>
        </div>
        <div className="nav-link-wrapper">
          {/* <Link to="/mailbox">Mailbox</Link> */}
          {/* <Link to="/logout">Logout</Link> */}

          <Link to='/about'>About Us</Link>
        </div>
      </nav>)
  }

  else {
    return (
      <nav> <p>Still no logged in user, sorry!</p>
        <NavbarFrontpage/>
      </nav>
    )
  }
}

export default NavbarTiger;


