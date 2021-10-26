import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';



class LogoutButton extends React.Component {

  submitHandler = () => {
    axios.post('/api/user/logout').then(() => {
      //withRouter aka  high order component allows to redirect as without there is no access to the route from here
      //for checking check the props...
      this.props.history.push("/")
      this.props.logInTheUser(null)
    }
    );
  //  <Redirect to='/'></Redirect>

  }


  render() {
    console.log("props",this.props)
    return (
      <div>
        <button onClick={this.submitHandler}>Log out</button>
      </div>
    )
  }
}


export default withRouter(LogoutButton)
