import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import NavbarTiger from '../../navigation/NavbarTiger';

export default class BuddyView extends Component {

  //TigerViewContent: - messages + own Profile..
  constructor(props) {
    super(props);
    this.state = {
      // loading: true,
      //  messages: [],
      profileInput: {
        tigerIntro: '',
        helpDef: ''
      }
    }
  }


  //toDo: Add the Profile Input to the state:
  // componentDidMount() {
  //   axios.post('/api/user/tigerView').then((allTigers) => {
  //     this.setState({
  //       profileInput: {
  //         tigerIntro: '{this.}',
  //         helpDef: '{this.}'
  //       }
  //     })
  //   })
  // }


  handleFormSubmit = (event) => {
    event.preventDefault();
    const tigerIntro = this.state.profileInput.tigerIntro;
    const helpDef = this.state.profileInput.helpDef;
    axios.post('/api/user', { tigerIntro, helpDef })
      .then(() => {
        this.props.getData()
        this.setState({ tigerIntro: "", helpDef: "" })
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { tigerIntro, helpDef } = event.target;
    this.setState({ [name]: value });
  }





  render() {
    return (

      <div>
        <NavbarTiger></NavbarTiger>

        <div id="tigerViewLogIn-Wrapper">
          <div className="tigerLeft">
            <div>
              <form
                className="tigerInputIntroduction"
                onSubmit={this.handleFormSubmit}>
                <p>
                  <label for="tigerIntro">Write a few sentences about yourself: </label><br
                  />
                  <input type="text" id="tigerIntro" name="tigerIntro" value={this.state.profileInput.tigerIntro} onChange={e => this.handleChange(e)} />
                  <textarea
                    type="text"
                    id="tigerIntro"
                    name="tigerIntro"
                    value={this.state.profileInput.tigerIntro}
                  >{{ userInSession.profileInput.tigerIntro }}</textarea>

                  <label for="helpDef">Write a few sentences about the help you need: </label>
                  <input type="text" id="tigerIntro" name="helpDef" value={this.state.profileInput.helpDef} onChange={e => this.handleChange(e)} />
                  <textarea
                    type="text"
                    id="helpDef"
                    name="helpDef"
                    value={this.state.profileInput.tigerIntro}
                  >{{ userInSession.profileInput.helpDef }}</textarea>
                </p>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}