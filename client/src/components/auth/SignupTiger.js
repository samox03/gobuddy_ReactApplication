import React from 'react'
import axios from 'axios'
import NavbarFrontpage from "../../components/navigation/NavbarFrontpage"
import Upload from './UploadPic'


class SignupTiger extends React.Component {

  state = {
    username: '',
    email: '',
    passwordHash: '',
    usertype: 'inNeed',
    birthday: '',   // actually this is type date
    city: '',
    choiceOfAction: '',
    profileInput: {
      tigerIntro: '',
      helpDef: ''
    }
  }

  // generic change handler for text input fields
  changeHandler = (e) => {
    let currentName = e.target.name

    let newState = {}
    newState[currentName] = e.target.value

    this.setState(newState)
  }

  //class property syntax
  submitHandler = () => {
    axios.post('/auth/signup/tiger', {
      username: this.state.username,
      email: this.state.email,
      passwordHash: this.state.passwordHash,
      usertype: 'inNeed',
      birthday: this.state.birthday,
      city: this.state.city,
      choiceOfAction: this.state.choiceOfAction,
      profileInput: {
        tigerIntro: this.state.profileInput.tigerIntro,
        helpDef: this.state.profileInput.helpDef
      }
    })
      .then(() => {
        alert('user created')
      })
  }



  render() {
    return (
      <div className="App">
            <NavbarFrontpage />
        <section className="welcomeText">
          <h2>Register to find buddy near you</h2>
          <h3>First of all, congratulations that you decided to ask for help. We know
            this is not easy, so you can be proud of yourself.  Fill out the form below,
            so you can get access to the network of helping hands around you. </h3>
        </section>

        <section className="userDetails">
          <div className="persDetails">

            {/* <form > */}
            <label>Username
              <input type='text' name='username' placeholder='Choose a username' value={this.state.username} onChange={this.changeHandler} />
            </label>
            <label>Email adress
              <input type="email" name="email" placeholder="Type your email" value={this.state.email} onChange={this.changeHandler} /></label>
            <label>Date of birth
              <input type="date" name="birthday" value={this.state.birthday} onChange={this.changeHandler} />
            </label>
            <label>Where do you live?
              <input type="text" name="city" value={this.state.city} onChange={this.changeHandler} /></label>
          </div>

          <div class="userSpecification">

            <h3>How do you want to help?Multiple choice possible.</h3>
            <ul className="multipleChoice">
              <li>
                <input type="checkbox" id="hangingOut" name="hangingOut" />
                <label for="hangingOut"> hanging out (walk, showing your city, have a coffee/tea together, having a sport session together)
                </label>
              </li>
              <li>
                <input type="checkbox" id="dailyTasks" name="dailyTasks"/>
                <label for="dailyTasks">organisation & daily tasks (grocery shopping, watering plants, German burocracy) </label>
              </li>
              <li>
                <input type="checkbox" id="teaching" name="teaching"/>
                <label for="teaching">teaching skills (tutoring, language help)
                </label>
              </li>
            </ul>
          </div>


          <div class="password-wrapper">
            <div>
              <label>Choose a password
                <input type='text' name='password' value={this.state.password} placeholder='Choose a password' onChange={this.changeHandler} />
              </label>
            </div>
            <div>
              <label>Confirm the password
                <input type="password" name="password" placeholder="Confirm your password" />
              </label>
            </div>
          </div>

          <Upload></Upload>
          <div>
            <button onClick={this.submitHandler}>Sign up</button>
            {/* </form> */}
          </div>
        </section >
      </div>
    );
  }
}

export default SignupTiger;