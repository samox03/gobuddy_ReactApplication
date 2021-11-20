import "./messenger.css";
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField'
import axios from "axios"
import Conversation from "../contact/conversations/Conversation"
import Message from "../contact/messages/Message"

//backend server connection left open to not hardcode the wrong path... working fine.
// const socket = io()

//socket.io cheats:
//CLIENT:
//Send event to server use: socket.emit
//Take event from server use: socket.on
//SERVER:
//Send event to client use: io
//Send to every client use: io.emit
//Send to one client use: io.to(socketID).emit
//Take event from client use: socket.on


function Messenger(props) {

  //hook version of state handling:
  // former version:const [state, setState] = useState({ message: '', name: '' })
  const [currentFriend, setCurrentFriend] = useState({});

  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null)



  //to simplify the socket request as socket.current:
  //useRef should actually prevent that the new user gets added in loop..
  //const socket = useRef(io("ws://localhost:8900"))
  const socket = useRef(io())

  //optimize displaying new message in chat -> automated scrolling down.
  // const scrollRef = useRef()


  //Equivalents to componentDidMount() / functional componant version:
  useEffect(() => {
    // socket.current = io("ws://localhost:8900");

    //send new user to server
    socket.current.emit('addUser', props.userInSession._id)

    //get new messages
    socket.current.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [props.userInSession])


  // //test socket:
  // useEffect(() => {
  //   socket.current?.on("welcome", message => {
  //     console.log(message)
  //   })
  // }, [socket])


  //to controll that new messages just get dispayed in the chat with that specific person
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])


  useEffect(() => {
    const getConversations = async () => {
      try {
        //this route is tested... ---> working in BE
        const res = await axios.get("api/conversations/" + props.userInSession._id)
        console.log("props.userinSessionId: ", props.userInSession._id)
        console.log(res.data)
        setConversations(res.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    getConversations()
  }, [props.userInSession._id])


  useEffect(() => {
    const getMessages = async () => {
      try {
        //this route is tested... ---> working in BE (api/messages/conversationId)
        const res = await axios.get("api/messages/" + currentChat?._id);
        const receiverId = currentChat.members.find(member => member !== props.userInSession._id)
        const res2 = await axios("/api/user?userId=" + receiverId);
        setMessages(res.data);
        setCurrentFriend(res2.data)
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: props.userInSession._id,
      text: newMessage,
      conversationId: currentChat._id
    };

    const receiverId = currentChat.members.find(member => member !== props.userInSession._id)

    socket.current.emit('sendMessage', {
      senderId: props.userInSession._id,
      receiverId,
      text: newMessage
    })

    try {
      const res = await axios.post('api/messages', message)
      setMessages([...messages, res.data])
      setNewMessage("");
    } catch (err) {
      console.log(err)
    }
  };

  //to make the chat auto scroll up
  useEffect(() => {
    //  scrollRef.current?.srollIntoView({ behavior: "smooth" })
  }, [messages])


  return (
    <div className="content-body">
      <div className="messenger">
        <div className="chatMenu">
          {/* <div className="chatMenuWrapper">
            <input placeholder="Search for conversation" className="chatMenuInput"></input>
          </div> */}
          <div className="conversation-list-wrapper">
            {conversations.map((c) => {
              return (<div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={props.userInSession} />
              </div>)
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatTitle">
                  <h2 className="heading-font heading-messenger">Your conversation with {currentFriend?.username} </h2>
                </div>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div>
                      <Message message={m} own={m.sender === props.userInSession._id} currentFriend={currentFriend} />
                    </div>
                  ))}
                </div>

                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat..
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )

}

export default Messenger