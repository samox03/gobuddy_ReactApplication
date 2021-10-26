import React from 'react';
import { Link } from 'react-router-dom';
import AboutUs from '../index/AboutUs';


const NavbarTiger = () => {

  if (this.props.userInSession) {
    return (
      <nav className="nav-style">
        <div>
          <div className="logoHeader">
            <img src="../../images/logo2Gobuddy.png" class="logo-small" />
          </div>
          <Link to="/auth/tigerView" className="homeLink" style={{ textDecoration: 'none' }}>
            <h2>Welcome, {this.props.userInSession.username} !</h2> </Link>
        </div>
        <div className="NavLinks">
          {/* <Link to="/mailbox">Mailbox</Link> */}
          {/* <Link to="/logout">Logout</Link> */}

          <Route exact path='/about' component={AboutUs}>About Us</Route>
        </div>
      </nav>)
  }

  else { <nav> <p>Still no logged in user, sorry!</p> </nav> }
}

export default NavbarTiger;


