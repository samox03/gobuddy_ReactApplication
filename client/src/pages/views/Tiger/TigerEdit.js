

import React, { Component } from 'react';
import axios from 'axios';

import NavbarFrontpage from '../../../components/navigation/NavbarFrontpage'

import { withRouter, Link} from 'react-router-dom';


class TigerEdit extends Component {

  state = {
    username: this.props.userInSession.username,
    city: this.props.userInSession.city,
    choiceOfAction: this.props.userInSession.choiceOfAction,
    tigerIntro: this.props.userInSession.profileInput.tigerIntro,
    helpDef: this.props.userInSession.profileInput.helpDef,
    profilePicture: this.props.userInSession.profileInput.helpDef
  }


  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username
    const city = this.state.city
    const choiceOfAction = this.state.choiceOfAction


    // let choiceOfAction = []
    // //task: Storing in choiceOfAction which checkboxes are activated: dailyTasks/hangignOut/teaching
    // if (dailyTasks === "on") {
    //   choiceOfAction.push('dailyTasks')
    // }
    // if (hangingOut == "on") {
    //   choiceOfAction.push('hangingOut')
    // }
    // if (teaching == "on") {
    //   choiceOfAction.push('teaching')
    // }


    const tigerIntro = this.state.tigerIntro;
    const helpDef = this.state.helpDef;
    axios.post('/api/user/tigerView', { username, city, choiceOfAction, tigerIntro, helpDef})
      .then(() => {
        this.props.history.push("/tigerview")
      })
      // .then( () => {
      //   <Redirect to='/tigerView'></Redirect>
      // })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }


  handleChangeCheckbox = (event) => {
    let copy = [...this.state.choiceOfAction]
    if (copy.includes(event.target.name)) {
      //if clicked: if the task is in the array remove it otherwise add it
      copy = copy.filter((el) => el !== event.target.name)
      console.log(copy)
    } else {
      copy.push(event.target.name)
    }
    this.setState({
      choiceOfAction: copy
    })
  }


  render() {
    return (
      <div>
        <nav className="nav-style">
        <Link to="/tigerView" className="homeLink" style={{ textDecoration: 'none' }}>
          <div className="logoHeader">
            <img src="../../images/logo2Gobuddy.png" className="logo-small" />
            <h3 className="brand-text">GoBuddy</h3>
          </div>
          </Link>
          <div>
            <h3>/Edit Profile</h3>
          </div>
        </nav>
        <div className="content-body">
          <div className="edit-page">
            <form onSubmit={this.handleFormSubmit} className="editForm">
              <div className="editForm-containers">
                <div className="editForm-wrapper-1">
                  <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} placeholder="this.state.username" />
                    <label>City:</label>
                    <input type="text" name="city" value={this.state.city} onChange={e => this.handleChange(e)} />
                  </div>
               
                <div className="userSpecification editForm-wrapper-2">
                  <h3>Do you want to update your search profile?</h3> <h3>Choose which support you are looking for...</h3>
                  <ul className="multipleChoice">
                    <li>
                      <input type="checkbox" id="hangingOut" name="hangingOut" checked={this.state.choiceOfAction.includes('hangingOut')} onChange={e => this.handleChangeCheckbox(e)} />
                      <label for="hangingOut"> hanging out (walk, showing your city, have a coffee/tea together, having a sport session together)
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="dailyTasks" name="dailyTasks" checked={this.state.choiceOfAction.includes('dailyTasks')} onChange={e => this.handleChangeCheckbox(e)} />
                      <label for="dailyTasks">organisation & daily tasks (grocery shopping, watering plants, German burocracy) </label>
                    </li>
                    <li>
                      <input type="checkbox" id="teaching" name="teaching" checked={this.state.choiceOfAction.includes('teaching')} onChange={e => this.handleChangeCheckbox(e)} />
                      <label for="teaching">teaching skills (tutoring, language help)
                      </label>
                    </li>
                  </ul>
                </div>
                </div>
                <div className="editForm-wrapper-3">
                  <p>
                    <label for="tigerIntro">Write a few sentences about yourself: </label>
                    <textarea
                      type="text"
                      id="tigerIntro"
                      name="tigerIntro"
                      onChange={e => this.handleChange(e)}
                    >{this.state.tigerIntro}</textarea>

                    <label for="helpDef">Write a few sentences about the help you need: </label>
                    <textarea
                      type="text"
                      id="helpDef"
                      name="helpDef"
                      onChange={e => this.handleChange(e)}
                    >{this.state.helpDef}</textarea>
                  </p>
                </div>
              </div>
              <button type="submit" value="Submit" className="update-Btn">Save Changes</button>
            </form>
          </div>
          <div>

          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(TigerEdit)
