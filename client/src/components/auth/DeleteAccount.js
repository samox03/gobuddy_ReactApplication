import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';



class DeleteAccount extends React.Component {

  submitHandler = () => {
    axios.post('/api/user/delete/:id').then(() => {
      //withRouter as a  'high order component' allows redirecing. Without this feature there is no access to the routing from here.
      //check the props of the component in the browser to see the difference. After the import of withRouter there ar additional props available in the component. E.g. history.push()
      this.props.history.push("/")
      this.props.logInTheUser(null)
    }
    );
  }


  render() {
    console.log("props",this.props)
    return (
      <div>
        <button onClick={this.submitHandler} className="update-Btn">Delete Account</button>
      </div>
    )
  }
}


export default withRouter(DeleteAccount)