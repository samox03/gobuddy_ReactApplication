import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import NavbarBuddy from '../../../navigation/NavbarBuddy'


export default class BuddyView extends Component {


  //To Do um die Tigers in der gleichen Stadt abzubilden:
  state = {
    loading: true,
    tigers: [],

    username: '',
    city: '',
    choiceOfAction: ''
  }


  //store tigers from same city as loggedin buddy in the state..

  componentDidMount() {
    axios.get('/api/user/buddyView').then((response) => {
      this.setState({
        loading: false,
        tigers: response.data
      })
    })
  }

  render() {
    console.log('response tigers:', this.state.tigers)
    if (this.state.loading) {
      return (<div>Loading</div>)
    }
    return (

      <div>
        <NavbarBuddy userInSession={this.props.userInSession} />

        <div className="content-body">
          <h2>People around you in need:</h2>
          {/* <div className="grid"> */}
          <div className="box-wrapper">
            {this.state.tigers.map((tiger) => {
              return (
                <div key={tiger._id} >
                  <Link to={`/tigerslist/${tiger._id}`} className="link-container">
                    {/* down here: bootstrap copy */}
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 mt-80 profile-box">
                          <div className="card bg-white d-flex align-items-center justify-content-center ">
                            <div className="w-100">
                              {
                                tiger.profilePicture ? <img src={tiger.profilePicture} alt="" className="profile-pic"></img> : <img src="../../../images/profilepicPlaceholder.png" className="profile-pic"></img>
                              }
                            </div>
                            <div className="text-center card-text">
                              <p className="prof-card-name">{tiger.username}</p>
                              <p className="prof-card-city">  {tiger.city}</p>
                              <p className="dis pb-4"> <strong>Looking for: </strong>
                                {tiger.choiceOfAction}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}

          </div>
        </div>
      </div>
      //  </div>

    )

  }
}

/* <NavbarBuddy userInSession={this.props.loggedInUser} /> */

