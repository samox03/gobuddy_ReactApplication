
   
import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="../../../images/profilepicPlaceholder.png"
          alt=""
        />
        {/* <img
          className="conversationImg"
          src={
            user?.profilePicture ? user.profilePicture : "../../../images/profilepicPlaceholder.png"
          }
          alt="profile picture"
        /> */}
        <div className="message-container"><p className="messageText">{message.text} </p></div>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}