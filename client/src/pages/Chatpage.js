import React, { Component } from 'react'
import NavbarBuddy from '../components/navigation/NavbarBuddy'
import NavbarTiger from '../components/navigation/NavbarTiger'
import Messenger from '../components/auth/contact/Messenger'
import "./chatpage.css";

export default function Chatpage(props) {

  return (
    <div>
      <div className="navbar-implementation">
      {props.userInSession?.usertype=='buddy' ? <NavbarBuddy userInSession={props.userInSession}/> : <NavbarTiger userInSession={props.userInSession}/>}
      </div>
      <div className="messenger-implemantation">
        <Messenger userInSession={props.userInSession} />
      </div>
    </div>
  )

}