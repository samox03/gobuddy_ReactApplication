

import React, { Component } from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import NavbarBuddy from '../../../components/navigation/NavbarBuddy'






class TigerDetails extends Component {


  state = {
    loading: true,
    tiger: {},
    // senderId: "",
    // receiverId: ""
  }

  componentDidMount() {
    this.showSingleTiger();
  }


  showSingleTiger = () => {
    console.log("params", this.props)
    const { params } = this.props.match;
    axios.get(`/api/user/tigerslist/${params.id}`)
      .then(responseFromApi => {
        const choosenTiger = responseFromApi.data;
        this.setState({
          loading: false,
          tiger: choosenTiger
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }


  // renderEditForm = () => {
  //   if(!this.state.username){
  //     this.getSingleTiger();
  //   } else {
  //   //                                                    {...props} => so we can have 'this.props.history' in Edit.js
  //   //                                                                                          ^
  //   //                                                                                          |
  //     return <TigerEdit tiger={this.state.tiger} getTigerProfile={this.showSingleTiger} {...this.props} />
  //   }
  // }

  startNewConversation = () => {
    let receiverId = this.props.match.params.id
    let senderId = this.props.userInSession._id
    console.log("current user : ", this.props.userInSession._Id)
    axios.post("/api/conversations/", { senderId, receiverId })
      .then(() => {
        this.props.history.push("/messenger")
      })
  }


  render() {
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    console.log("state", this.state)
    return (
      <div>
        <NavbarBuddy userInSession={this.props.userInSession} />

        <div className="content-body">
          <div className="buddy-view-wrapper">
            <div className="heading-spacer">
              <p className="header-in-page">Share some time with {this.state.tiger.username}!</p>
            </div>
            <div className="grid-tiger-det">
              {/* <div className="tiger-pic-det-box"> */}
              <div></div>
              <div className="tiger-det-left">
                <div className="w-100 tiger-pic-det">
                  {
                    this.state.tiger.profilePicture ? <img src={this.state.tiger.profilePicture} alt="" className="profile-pic-det"></img> : <img src="../../../images/profilepicPlaceholder.png" className="profile-pic-det"></img>
                  }
                </div>
                {/* </div> */}
                <div className="centered-text"><p className="header-in-page-small heading-font"> Hey I am {this.state.tiger.username}! </p></div>
              </div>
              <div className="tiger-det-right">
                <div className="tigerDetails-wrapper">
                  <div className="content-tiger-det">
                    <div className="content-tiger-det">
                      <strong>Topic:</strong>
                    </div>
                    {this.state.tiger.choiceOfAction?.map((action) => {
                      return (<div>{action}</div>)
                    })
                    }
                    {/* <p>{this.state.tiger.choiceOfAction}</p> */}
                    <div className="content-tiger-det">
                      <strong>Short Infos:</strong>
                      <p>{this.state.tiger.profileInput.tigerIntro}</p>
                    </div>
                    <div className="content-tiger-det">
                      <strong>Looking for:</strong>
                      <p>{this.state.tiger.profileInput.helpDef}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="buttom-part-tiger-det">
              <div>
                <button className="basic-btn" onClick={this.startNewConversation}>
                  Get in touch!
                </button>
              </div>
              <div className="backwards-container">
                <Link to={'/buddyView'} className="link-plain">Back to overview</Link>
              </div>
            </div >
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TigerDetails)