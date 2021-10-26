import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import NavbarBuddy from '../../navigation/NavbarBuddy';
import axios from 'axios'
import TigerDetails from './TigerDetails';

export default class BuddyView extends Component {


  //To Do um die Tigers in der gleichen Stadt abzubilden:
  state = {
    loading: true,
    tigers: [],

    username: '',
    city: '',
    choiceOfAction: ''
  }


  //select just the tigers in the same city and store them in the state..
  //here I choose all tigers, thats wrong...

  componentDidMount() {
    axios.get('/api/user/buddyView').then((allTigers) => {
      this.setState({
        loading: false,
        tigers: allTigers.data
      })
    })
  }

  render() {
    return (
      <div>
        {/* <NavbarBuddy userInSession={this.state.loggedInUser} /> */}

        <div className="main-content-box">
          <h3>People around you in need:</h3>
          <div className="box-wrapper">
            <div className="grid">
              <div className="g-col-6">
                <div className="box-wrapper">
                  {this.state.tigers.map((tiger) => {
                    return (<div key={tiger._id}>
                      <Link to={`/tigerslist/${tiger._id}`} component={TigerDetails}>
                        <h5>{tiger.username}
                        </h5>
                        <h6><strong>City:</strong>
                          {tiger.city}
                          <strong>Looking for: </strong>
                          {tiger.choiceOfAction}</h6>
                      </Link>
                    </div>
                      //<Link to=`/tigerslist/${tiger._id}` component={TigerDetails}>Details</Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}