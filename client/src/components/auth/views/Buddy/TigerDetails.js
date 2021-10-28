

import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavbarBuddy from '../../../navigation/NavbarBuddy';
import TigerEdit from '../Tiger/TigerEdit';




export default class TigerDetails extends Component {


  state = {
    loading: true,
    tiger: {}
  };



  componentDidMount() {
    this.showSingleTiger();
  }


  showSingleTiger = () => {
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
    return (
      <div>
        <NavbarBuddy userInSession={this.props.loggedInUser} />
        <div className="content-body">
          <h3>Share some time with {this.state.tiger.username}!</h3>
          <div>
            <div className="grid">
              <div className="g-col-6">
                <div className="box-wrapper">
                  <h3> {this.state.tiger.username} wrote: </h3>
                  <h4><strong>Topic:</strong> {this.state.tiger.choiceOfAction}</h4>
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
                  {/* <button className="message-Btn"> */}
                  {/* <Link to={`/contact/${this.state.tiger._id}/message}`> Get in touch! </Link> */}

                  {/* </button> */}
                  <p>add Get in touch button</p>
                </div>
              </div>
            </div>
            <Link to={'/tigerslist'}>Back to overview</Link>
          </div>
        </div>
      </div>
    )
  }
}