import React from "react";
import "./team_chat.css"; // Optional CSS for styling


const TeamChat = ({ chatRooms }) => {
  return (
    <div className="team-chat">
      <h3>Teams' Chat Rooms</h3>
      <div className="team-chat-rooms">
        {chatRooms.filter(room => room.team !== "General").map(room => (
          <div key={room.id} className="chat-room">
            <img src={room.logoUrl} alt={`${room.team} Logo`} className="chat-room-logo" />
            <a href={`/chatrooms/${room.id}`} className="chat-room-link">{room.name}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamChat;
