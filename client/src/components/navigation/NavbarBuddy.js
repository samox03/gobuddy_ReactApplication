import React from 'react';
import { Link, Route } from 'react-router-dom';
import NavbarFrontpage from './NavbarFrontpage'


const NavbarBuddy = () => {

  if (this.props.userInSession) {
    return (
      <nav className="nav-style">
        <div>
          <div className="logoHeader">
            <img src="../../images/logo2Gobuddy.png" class="logo-small" />
          </div>
          <Link to="/auth/buddyView" className="homeLink navLink" style={{ textDecoration: 'none' }}>
            <h2>Welcome, {this.props.userInSession.username} !</h2> </Link>
        </div>
        <div className="nav-link-wrapper">
          <ul>

            {/* <li><Link to="/interact/mailbox">Mailbox</Link> className="mailboxLink navLink" style={{ textDecoration: 'none' }</li>*/}
            {/* <li><Link to="/logout">Logout</Link></li> */}
            <li>
              <Link to="/tigerslist">Overview</Link>
            </li>

            <li>
              <Link to='/about' className="aboutLink navLink" style={{ textDecoration: 'none' }}> About Us</Link>
            </li>

          </ul>

        </div>
      </nav >)
  }

  else {
    return (
      <nav> <p>Still no logged in user, sorry!</p>
        <NavbarFrontpage></NavbarFrontpage>
      </nav>
    )
  }
}

export default NavbarBuddy;