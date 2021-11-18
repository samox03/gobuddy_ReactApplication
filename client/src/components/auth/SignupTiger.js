import React from 'react'
import axios from 'axios'
import NavbarFrontpage from "../../components/navigation/NavbarFrontpage"
import Upload from './UploadPic'
import { withRouter } from 'react-router-dom';



class SignupTiger extends React.Component {

  state = {
    username: '',
    email: '',
    password1: '',
    password2: '',
    usertype: 'inNeed',
    birthday: '',   // actually this is type date
    city: '',
    choiceOfAction: '',
    profileInput: {
      tigerIntro: '',
      helpDef: ''
    },
    errorMessage: ""
  }

  // generic change handler for text input fields
  changeHandler = (e) => {
    let currentName = e.target.name

    let newState = {}
    newState[currentName] = e.target.value

    this.setState(newState)
  }

  //class property syntax
  submitHandler = (event) => {
    event.preventDefault();

    axios.post('/api/user/signup/tiger', {
      username: this.state.username,
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2,
      usertype: 'inNeed',
      birthday: this.state.birthday,
      city: this.state.city,
      choiceOfAction: this.state.choiceOfAction,
      profileInput: {
        tigerIntro: this.state.profileInput.tigerIntro,
        helpDef: this.state.profileInput.helpDef
      }
    })
      .then((result) => {
        console.log("result", result.data.errorMessage)
        //display error message if an error gets send from BE:
        if (result.data.errorMessage) {
          this.setState({
            errorMessage: result.data.errorMessage
          })
        } else {

          this.props.history.push("/login")
        }
      }).catch(error => {
        console.log("error", error)
      })
  }



  render() {
    return (
      <div >

        <NavbarFrontpage />

        <div className="content-body">
          <section className="welcomeText">
            <h2 className="header-signup">Register to find a buddy near you</h2>
          </section>
          <section>
            <h3>First of all, congratulations that you decided to ask for help. </h3> <h3> We know
              this is not easy, so you can be proud of yourself! </h3> <h3>Fill out the form below,
                so you can get access to the network of helping hands around you. </h3>
          </section>

          <section className="profile-det-wrapper">
            <div className="userDetails">
              <div className="persDetails">
                {/* <form > */}
                <div><label>Username:
                  <input type='text' name='username' placeholder='Choose a username' value={this.state.username} onChange={this.changeHandler} /> </label></div>

                <div>
                  <label>Email adress:
                    <input type="email" name="email" placeholder="Type your email" value={this.state.email} onChange={this.changeHandler} />
                  </label>
                </div>
                <div>
                  <label>Date of birth:
                    <input type="date" name="birthday" value={this.state.birthday} onChange={this.changeHandler} />
                  </label>
                </div>
                <div>
                  <label>Where do you live?
                    <input type="text" name="city" value={this.state.city} onChange={this.changeHandler} />
                  </label>
                </div>
              </div>

              <div className="userSpecification">
                <h3>Where do you wish some support? Multiple choice possible.</h3>
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
                    <label for="teaching">teaching skills (tutoring, language help) </label>
                  </li>
                </ul>
              </div>
            </div>
          </section >
          <section>
            <div className="password-wrapper">
              <div className="password-wrap">
                <label>Choose a password:
                  <input type='password' name='password1' value={this.state.password1} placeholder='Choose a password' onChange={this.changeHandler} />
                </label>
              </div>
              <div className="password-wrap">
                <label>Confirm the password:
                  <input type="password" name="password2" value={this.state.password2} placeholder="Confirm your password" onChange={this.changeHandler} />
                </label>
              </div>
            </div>
          </section>
          <section>
            {/* <Upload></Upload> */}
            <div>
              <button onClick={this.submitHandler} className="basic-btn">Sign up</button>
              <div>
                {
                  this.state.errorMessage && <h1 className="errorMessage">{this.state.errorMessage}</h1>
                }
              </div>
              {/* </form> */}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupTiger);