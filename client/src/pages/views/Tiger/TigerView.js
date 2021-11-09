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
          <h3>Your profile:</h3>
          <div id="tigerViewLoggedIn-Wrapper">
            <div className="tigerLeft">
              <div className="profilePic-tigerview">
                {/* display profile pic if there is one otherwise show placeholder pic */}
                {
                  this.state.user.profilePicture ? <img src={this.state.user.profilePicture} width={"80px"}></img> : <img src="../../../images/profilepicPlaceholder.png" width={"80px"} className="profile-pic-det"></img>
                }
              </div>
              <div className="profileDetailsList">
               
                  <h3>Username: {this.state.user.username}</h3>
                  <h3>City: {this.state.user.city}</h3>
            
              </div>
            </div>
            <div className="tigerRight">
                <div className="tigerRight-content" >
                  <h4>Cathegories: </h4>
                  <p>{this.state.user.choiceOfAction}</p>
                  {/* {userChoiceOfAction.map((task) => {<div>{task}</div>})} */}
                  <h4>Introduction: </h4>
                  <p>{this.state.user.profileInput.tigerIntro}</p>
                  <h4>The help you're asking for: </h4>
                  <p>{this.state.user.profileInput.helpDef}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="update-Btn"><Link to={`/tigerView/edit`}>Edit Profile
          </Link></button>
        
        </div>
      </div>
    )
  }
}