import React from 'react';
import { Link, Route } from 'react-router-dom';
import NavbarFrontpage from './NavbarFrontpage'
import LogoutButton from '../auth/Logout';


const NavbarBuddy = (props) => {

  if (props.userInSession) {
    // console.log("props.userInSession",props.userInSession)
    return (
      <nav className="nav-style">
        <div className="nav-wrapper-left">
          <div className="logoHeader">
            <img src="../../images/logo2Gobuddy.png" className="logo-small" />
          </div>
          <Link to="/buddyView" className="homeLink navLink" style={{ textDecoration: 'none' }}>
            <h2 className="">Welcome, {props.userInSession.username} !</h2> </Link>
        </div>
        <div className="nav-link-wrapper">
          <ul>

            {/* <li><Link to="/interact/mailbox">Mailbox</Link> className="mailboxLink navLink" style={{ textDecoration: 'none' }</li>*/}
            {/* <li><Link to="/logout">Logout</Link></li> */}
            <li>
              <Link to="/buddyView">Overview</Link>
            </li>
            <li>
            <Link to='/messenger'>
            <img src="./../images/message_icon.png" className="nav-icon" alt="messenger icon"/>
            </Link>
            </li>
            <li>
              <LogoutButton logInTheUser={props.logInTheUser}>Logout</LogoutButton>
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