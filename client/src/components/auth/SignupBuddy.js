import React from 'react'
import axios from 'axios'
import NavbarFrontpage from "../../components/navigation/NavbarFrontpage"
import Upload from './UploadPic'


class SignupBuddy extends React.Component {

  state = {
    username: '',
    email: '',
    password1: '',
    password2: '',
    usertype: 'buddy',
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
    axios.post('/api/user/signup/buddy', {
      username: this.state.username,
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2,
      usertype: 'buddy',
      birthday: this.state.birthday,
      city: this.state.city,
      choiceOfAction: this.state.choiceOfAction,
      profileInput: {
        tigerIntro: this.state.profileInput.tigerIntro,
        helpDef: this.state.profileInput.helpDef
      }
    }).then(() => {
      alert('user created')
    })
  }



  render() {
    return (
      <div >
        <NavbarFrontpage />
        <div className="content-body">
          <section className="welcomeText">
            <h2>Connect with people in your area who will be glad about some hours of your support!</h2>
            <h3>First of all, thank you for your choice of sharing your time! Fill out the form below, so you can take a look on the needs in your city. You will not get any requests from others, as a buddy it is on you to take a first step of contact.
              </h3>
        
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

                <h3>How do you want to help? <em>Multiple choice possible.</em></h3>
                <ul className="multipleChoice">
                  <li>
                    <input type="checkbox" id="hangingOut" name="hangingOut" />
                    <label for="hangingOut"> hanging out (walk, showing your city, have a coffee/tea together, having a sport session together) </label>
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
            </div>


            <div className="password-wrapper">
              <div>
                <label>Choose a password:
                  <input type='password' name='password1' value={this.state.password1} placeholder='Choose a password' onChange={this.changeHandler} />
                </label>
              </div>
              <div>
                <label>Confirm the password:
                  <input type="password" name="password2" value={this.state.password2} placeholder="Confirm password" onChange={this.changeHandler} />
                </label>
              </div>
            </div>

            {/* <Upload></Upload> */}
            <div>
              <button onClick={this.submitHandler} className="signup-btn">Sign up</button>
              {/* </form> */}
            </div>
          </section >
        </div>
      </div>
    );
  }
}

export default SignupBuddy;