

import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavbarBuddy from '../../navigation/NavbarBuddy';



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


  render() {
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    return (
      <div>

        {/* <NavbarBuddy userInSession={this.state.loggedInUser} /> */}

        <div className="main-content-box">
          <div className="grid">
            <div className="g-col-6">
              <div className="box-wrapper">

                <h3>Profile of {this.state.username}</h3>
                <h4><strong>Topic:</strong> {this.state.choiceOfAction}</h4>
                <div className="tigerDetails-wrapper">
                  <div>
                    <strong>Short Infos:</strong>
                    <p>{this.state.profileInput.tigerIntro}</p>
                  </div>
                  <div>
                    <strong>Looking for:</strong>
                    {this.state.profileInput.helpDef}
                    <br />
                  </div>
                </div>
                <button className="update-Btn"><a
                  href="/contact/{{tigerDetails._id}}/message"
                >Get in touch!</a></button>
              </div>
            </div>
          </div>
          <Link to={'/tigerslist'}>Back to overview</Link>
        </div>
      </div>
    )
  }
}