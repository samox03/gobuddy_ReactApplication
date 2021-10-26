import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import LogoutButton from '../auth/Logout';

export default class Footer extends Component {
  render () {
    return(
      <div className="Footer">
        <LogoutButton logInTheUser={this.props.logInTheUser}>Logout</LogoutButton>
        &copy; Samox [Ironhacker] 2021
      </div>
    )
  }
}

