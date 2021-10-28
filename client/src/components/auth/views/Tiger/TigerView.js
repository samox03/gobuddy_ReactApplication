import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import NavbarTiger from '../../../navigation/NavbarTiger';
import Upload from '../../UploadPic'

export default class TigerView extends Component {

  //TigerViewContent: messages + own Profile..

  state = {
    // loading: true,
    //  messages: [],


    tigerIntro: this.props.userInSession.profileInput.tigerIntro,
    helpDef: this.props.userInSession.profileInput.helpDef

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
    const tigerIntro = this.state.tigerIntro;
    const helpDef = this.state.helpDef;
    axios.post('/api/tigerView', { tigerIntro, helpDef })
      .then(() => {
        this.setState({ tigerIntro: "", helpDef: "" })
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }



  render() {
    return (

      <div>
        <NavbarTiger userInSession={this.props.userInSession}></NavbarTiger>
        <div className='content-body'>
          <div id="tigerViewLogIn-Wrapper">
            <div className="tigerLeft">
              <div>
                <form
                  className="tigerInputIntroduction"
                  onSubmit={this.handleFormSubmit}>
                  <p>
                    <label for="tigerIntro">Write a few sentences about yourself: </label>
                    {/* <input type="text" id="tigerIntro" name="tigerIntro" value={this.state.tigerIntro} onChange={e => this.handleChange(e)} /> */}
                    <textarea
                      type="text"
                      id="tigerIntro"
                      name="tigerIntro"
                      //value={this.state.tigerIntro}
                      onChange={e => this.handleChange(e)}
                    >{this.state.tigerIntro}</textarea>

                    <label for="helpDef">Write a few sentences about the help you need: </label>
                    {/* <input type="text" id="tigerIntro" name="helpDef" value={this.state.helpDef} onChange={e => this.handleChange(e)} /> */}
                    <textarea
                      type="text"
                      id="helpDef"
                      name="helpDef"
                      //value={this.state.helpDef}
                      onChange={e => this.handleChange(e)}
                    >{this.state.helpDef}</textarea>
                  </p>
                  <button type="submit" value="Submit">Submit</button>
                </form>
              </div>
            </div>
            <div className="tigerRight">
              <div className="profilePic">
                <Upload></Upload>
              </div>
              <div className="profileDetailsList">
                <h4>Username: {this.props.userInSession.username}</h4>
                <h4>City: {this.props.userInSession.city}</h4>
                <h4>Cathegories: {this.props.userInSession.choiceOfAction}</h4>
              </div>
              <h4>Add edit Profile Button/ integrate component</h4>
              <h4>Add delete Profile Button/ integrate component</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}