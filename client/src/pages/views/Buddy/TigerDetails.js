

import React, { Component } from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import NavbarBuddy from '../../../components/navigation/NavbarBuddy'






class TigerDetails extends Component {


  state = {
    loading: true,
    tiger: {}
  };



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



  render() {
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    console.log("state", this.state)
    return (
      <div>
        <NavbarBuddy userInSession={this.props.userInSession} />

        <div className="content-body content-tiger-det">
          <div className="heading-spacer"> <h3>Share some time with {this.state.tiger.username}!</h3>
          </div>
          <div>
            <div className="grid-tiger-det">
              {/* <div className="tiger-pic-det-box"> */}
              <div className="w-100 tiger-pic-det">
                {
                  this.state.tiger.profilePicture ? <img src={this.state.tiger.profilePicture} alt="" className="profile-pic-det"></img> : <img src="../../../images/profilepicPlaceholder.png" className="profile-pic-det"></img>
                }
              </div>
              {/* </div> */}

              <div className="tiger-det-box-wrapper">

                <div className="centered-text"><h3> Hey I am {this.state.tiger.username} ! </h3></div>
                <div className="centered-text"><h4><strong>Topic:</strong> {this.state.tiger.choiceOfAction}</h4></div>
                <div className="tigerDetails-wrapper">
                  <div>
                    <strong>Short Infos:</strong>
                    <p>{this.state.tiger.profileInput.tigerIntro}</p>
                  </div>
                  <div>
                    <strong>Looking for:</strong>
                    {this.state.tiger.profileInput.helpDef}
                    <br />
                  </div>
                </div>
                <button className="basic-btn">
                <Link to={`/contact/${this.state.tiger._id}/message`}> Get in touch! </Link>
                </button>
              </div>

              <Link to={'/buddyView'}>Back to overview</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TigerDetails)