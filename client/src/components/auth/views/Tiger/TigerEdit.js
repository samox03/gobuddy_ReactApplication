

import React, { Component } from 'react';
import axios from 'axios';


class TigerEdit extends Component {

  state = {
    username: this.props.user.username,
    // email: '',
    // passwordHash: '',
    // usertype: 'inNeed',
    // birthday: '',   // actually this is type date
    city: this.props.user.city,
    choiceOfAction: this.props.user.choiceOfAction,
    profileInput: {
      tigerIntro: '',
      helpDef: ''
    }
  }


  // handleFormSubmit = (event) => {
  //   const username = this.state.username;
  //   const city = this.state.city;

  //   event.preventDefault();

  //   axios.put(`/api/user/tigerslist/${this.props.theProject._id}`, { username, city })
  //   .then( () => {
  //       this.props.getTigerProfile();
  //       // after submitting the form, redirect to '/tigerView'
  //       this.props.history.push('/tigerView');    
  //   })
  //   .catch( error => console.log(error) )
  // }

  handleChangeUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handleChangeCity = (event) => {
    this.setState({
      city: event.target.value
    })
  }



  render() {
    return (
      <div>
        <hr />
        <h3>Edit Profile</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="Username" value={this.state.username} onChange={e => this.handleChangeUsername(e)} />
          <label>City:</label>
          <textarea name="City" value={this.state.city} onChange={e => this.handleChangeCity(e)} />
          {/* <label>choiceOfAction:</label>
          <input type="text" name="choiceOfAction" value={this.state.choiceOfAction} onChange={e => this.handleChangeTitle(e)} /> */}

          <div class="userSpecification">

            <h3>Do you want to update your search profile? Choose which support you are looking for...</h3>
            <ul className="multipleChoice">
              <li>
                <input type="checkbox" id="hangingOut" name="hangingOut" />
                <label for="hangingOut"> hanging out (walk, showing your city, have a coffee/tea together, having a sport session together)
                </label>
              </li>
              <li>
                <input type="checkbox" id="dailyTasks" name="dailyTasks" />
                <label for="dailyTasks">organisation & daily tasks (grocery shopping, watering plants, German burocracy) </label>
              </li>
              <li>
                <input type="checkbox" id="teaching" name="teaching" />
                <label for="teaching">teaching skills (tutoring, language help)
                </label>
              </li>
            </ul>
          </div>


          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }

}

export default TigerEdit
