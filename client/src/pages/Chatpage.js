import React, { Component } from 'react'
import NavbarBuddy from '../components/navigation/NavbarBuddy'
import Messenger from '../components/auth/contact/Messenger'

export default function  Chatpage(props) {
 
    return(
      <div>
        <NavbarBuddy userInSession={props.userInSession}/>
        <Messenger userInSession={props.userInSession}/>
      </div>
    )
  
}