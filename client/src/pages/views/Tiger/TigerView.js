import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import NavbarTiger from '../../../components/navigation/NavbarTiger';
import DeleteAccount from '../../../components/auth/DeleteAccount';

export default class TigerView extends Component {
  state = {
    user: this.props.userInSession
  }

  componentDidMount() {
    axios.get('/api/user/checkuser').then(res => {

      this.setState({
        user: res.data.userDoc
      })
    })
  }



  render() {
    console.log("user", this.state.user)
    let userChoiceOfAction = this.state.user.choiceOfAction

    return (

      <div>
        <NavbarTiger userInSession={this.props.userInSession}></NavbarTiger>
        <div className='content-body'>
          <div className="buddy-view-wrapper">
            <p className="header-in-page">Your profile:</p>
            <div className="grid-tiger-det">
              <div className="tigerLeft">
                <div className="w-100 tiger-pic-det">
                  {/* display profile pic if there is one otherwise show placeholder pic */}
                  {
                    this.state.user.profilePicture ? <img src={this.state.user.profilePicture} width={"80px"} className="profile-pic-det"></img> : <img src="../../../images/profilepicPlaceholder.png" width={"80px"} className="profile-pic-det"></img>
                  }
                </div>
                <div className="profileDetailsList">
                  <p> <strong>Username: </strong></p>
                  <p>{this.state.user.username}</p>
                  <p><strong>City: </strong> </p>
                  <p>{this.state.user.city}</p>
                </div>
              </div>
              <div className="tigerRight">
                <div className="tigerDetails-wrapper" >
                  <div className="content-tiger-det">
                    <div className="content-tiger-det">
                      <p> <strong>Cathegories:</strong></p>
                    </div>
                    <div className="tag-wrapper-tigerpage">
                      {this.state.user.choiceOfAction.map((task) => { return (<div className="action-tag">{task}</div>) })}
                    </div>
                    <div className="content-tiger-det">
                      <p><strong>Introduction: </strong></p>
                      <p>{this.state.user.profileInput.tigerIntro}</p>
                    </div>
                    <div className="content-tiger-det">
                      <p><strong>The help you're asking for: </strong></p>
                      <p>{this.state.user.profileInput.helpDef}</p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div>
              <button className="update-Btn"><Link to={`/tigerView/edit`}>Edit Profile
              </Link></button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}