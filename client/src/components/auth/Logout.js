import React from 'react'
import axios from 'axios'
//import { useHistory } from "react-router-dom";



class LogoutButton extends React.Component {

  submitHandler = () => {
    axios.post('/api/user/logout').then(() => {
      this.props.logInTheUser(null)
    }
    )
  }


render() {
  return (
    <div>
      <button onClick={this.submitHandler}>Log out</button>
    </div>
  )
}
}



// function LogoutButton() {

//   let history = useHistory();

//   const handleLogOut = () => {
//     sessionStorage.setItem("userToken", '');
//     sessionStorage.clear();
//     history.push("/"); // whichever component you want it to route to
//   }

//   return (
//     <button type="button" onClick={handleLogOut}>
//       Logout
//     </button>
//   );
// }


export default LogoutButton
