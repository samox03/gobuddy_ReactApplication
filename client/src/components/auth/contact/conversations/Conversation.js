import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
// const User = require('../models/User.model');


export default function Conversation({ conversation, currentUser }) {
  //user came in as props from parent component
  let [friend, setFriend] = useState(null)

  //const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //show users
  useEffect(() => {
    //show the other user in conversation that is not user
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    //find username of conversation partner

    //
    const getFriend = async () => {
      try {
        //what is the axios here is for? it says it catchs the currentusers id + the conversation partners id...
        const res = await axios("/api/user?userId=" + friendId);
        //respond shall be both communicators details...
        setFriend(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <div>
        <img
          className="conversationImg"
          src={
            friend?.profilePicture ? friend.profilePicture : "../../../images/profilepicPlaceholder.png"
          }
          alt="profile picture"
        />
      </div>
      <div>
        <p className="">{friend?.username}</p>

      </div>
    </div>
  );
}