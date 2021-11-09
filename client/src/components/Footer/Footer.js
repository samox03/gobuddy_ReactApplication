import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import LogoutButton from '../auth/Logout';

export default class Footer extends Component {
  render() {

    // if (this.props.userInSession) {
      return (
        <div className="footer">
          <div className="container-footer">
            <Link to='/about' className="link-footer">About Us</Link >
            <div><p>&copy; Samox [Ironhacker] 2021</p></div>
          </div>
        </div>
      )
    }
    // else {
    //   <div className="footer">
    //     <div className="container-footer">
    //       <Link to='/about' className="link-footer">About Us</Link >
    //       <div>  <DeleteAccount></DeleteAccount></div>
    //       <div><p>&copy; Samox [Ironhacker] 2021</p></div>
    //     </div>
    //   </div>
    // }
 // }
}