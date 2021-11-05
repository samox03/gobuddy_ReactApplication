// import React from 'react'
// import axios from 'axios'
// import {Link} from 'react-router-dom'
// import NavbarBuddy from "./../../navigation/NavbarBuddy"


// class InboxBuddy extends React.Component {

//   state = {
//     messages: data.msgs, // stores all Messages with user as receiver??!! As array of objects? (like this would contain content/receiver/sender/time)
//     messageAlert: false
//   }

//   // checkForNewMessage = () => {
//   //   setInterval(() => {
//   //     axios.get('/api/user/contact/inbox')
//   //       .then(responseFromApi => {
//   //         let newMessage = responseFromApi.data.msgs
//   //         if (newMessage) {
//   //           this.setState({
//   //             messages: messages.push(newMessage),
//   //             messageAlert: true
//   //           })
//   //         }
//   //       })
//   //   }, 5000)
//   // }


//   render() {

//     return (
//       <div>
//         <NavbarBuddy></NavbarBuddy>
//         <div>
//           this.state.messageAlert ? <h2>You got a new message</h2> : <h2>No new messages...</h2>
//         </div>
//         <div className="message-wrapper">
//           <div className="inbox">
//             <h3>Inbox</h3>
//             {/* Loop through array of Messages with .map and display them... */}
//             {/* {this.state.messages.map((mess) => { */}
//             {this.state.message.sender.username}
//             <br />
//             <Link to="{this.state.message.sender._id}/message" className="update-Btn">See Conversation</Link>
//           </div>
//         </div>
//       </div>
//     )
//   }

// }


// export default InboxBuddy;