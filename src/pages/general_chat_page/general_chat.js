import React from "react";
import "./general_chat.css"; // Optional CSS for styling

const GeneralChat = ({ chatRooms }) => {
  return (
    <div className="general-chat">
      <h3>General Chat Room</h3>
      <div className="general-chat-rooms">
        {chatRooms.filter(room => room.team === "General").map(room => (
          <div key={room.id} className="chat-room">
            <a href={`/chatrooms/${room.id}`} className="chat-room-link">{room.name}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralChat;
