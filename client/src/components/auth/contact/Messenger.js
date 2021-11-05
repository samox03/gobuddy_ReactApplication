import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavbarBuddy from "../../navigation/NavbarBuddy"

//this backend or the 5555 backend???
const socket = io.connect('http://localhost:4000')


function Messenger(props) {

  const [state, setState] = useState({ message: '', name: '' })
  const [chat, setChat] = useState([])


  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }])
    })
  })


  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }



  const onMessageSubmit = (e) => {
    e.preventDefault()
    const { name, message } = state
    socket.emit('message', { name, message })
    setState({ message: '', name })
  }


  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }


    return (
      <div>
        <NavbarBuddy userInSession={props.userInSession} />
        <div className="messenger">

          <div className="chatMenu">
            <div className="chatMenuWrapper">
              {/* <input placeholder="Search for conversation" className="chatMenuInput"></input> */}
            </div>
          </div>

          <div className="chatBox">
            <div className="chatBoxWrapper">
              <form onSubmit={onMessageSubmit}>
                <h1>Messenger</h1>
                <div className="name-field">
                  <TextField
                    name="name"
                    onChange={(e) => onTextChange(e)}
                    value={state.name}
                    label="Name"
                  />
                </div>
                <div className="message-field">
                  <TextField
                    name="message"
                    onChange={(e) => onTextChange(e)}
                    value={state.message}
                    label="Message"
                  />
                </div>
                <button className="signup-btn">Send Message</button>
              </form>
            </div>
          </div>

          <div className="chatOnline">
            <div className="chatOnlineWrapper">
              <div className="render-chat">
                <h1>Chat Log</h1>
                {renderChat()}
              </div>
            </div>
          </div>


        </div>
        <button className="signup-btn"><Link to={'/buddyView'}>Back to overview</Link></button>
      {/* <button className="signup-btn"><Link to={`/tigerslist/${tiger._id}`}>Back to profile</Link></button> */}
      </div>
    )

}

export default Messenger