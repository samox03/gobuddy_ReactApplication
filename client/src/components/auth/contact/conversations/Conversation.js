import axios from "axios";
import { useEffect, useState } from "react";
// import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  //user came in as props from partent component
  const [user, setUser] = useState(null);

  //const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //show users
  useEffect(() => {
    //show the other user in conversation that is not user
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    //
    const getUser = async () => {
      try {
        //what is the axios here is for? it says it catchs the currentusers id + the conversation partners id...
        const res = await axios("api/users?userId=" + friendId);
        //respond shall be both communicators details...
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">

      {/* <img
        //className="conversationImg"
        src={
          user.profilePicture? user.profilePicture : "../../../images/profilepicPlaceholder.png"
        }
        alt="profile picture"
      /> */}
      <div> <img src="../../../images/profilepicPlaceholder.png" className="messageImg" />
        <span className="conversationName">{user?.username}</span>
        {/* <span className="conversationName">{friendId.username}</span> */}
      </div>
      <div>
        <h3>Display Conversation Name..</h3>
      </div>
    </div>
  );
}