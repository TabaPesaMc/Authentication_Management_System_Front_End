import React, { useEffect, useState } from "react";
import axios from "axios";
// import Profile from "../profile_page/profile.js";
// import TeamChat from "../team_chat_page/team_chat.js";
// import GeneralChat from "../general_chat_page/general_chat.js";
// import PrivateChat from "../private_chat_page/private_chat.js";
import NavBar from "../nav_bar/nav_bar.js";
import "./home.css"; // Optional CSS for styling
const Home = () => {
  const [profileData, setProfileData] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch user profile
        const profileResponse = await axios.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(profileResponse.data);

        // Fetch chat rooms
        const chatRoomResponse = await axios.get("/api/chatrooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChatRooms(chatRoomResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      {/* Top Navigation Bar */}
      <NavBar />

      <div className="home-layout">
        {/* Left Sidebar */}
        {/* <aside className="sidebar left-sidebar">
          <ul>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/chatrooms">Chat Rooms</a></li>
            <li><a href="/private-chats">Private Chats</a></li>
            <li><a href="/notifications">Notifications</a></li>
            <li><a href="/settings">Settings</a></li>
          </ul>
        </aside> */}

        {/* Main Content Area */}
        <main className="main-content">
          <div className="welcome">
            <h2>Welcome, {profileData?.username}!</h2>
            <p>Your favorite team: <strong>{profileData?.favoriteTeam}</strong></p>
          </div>

          <div className="chat-rooms">
            <h3>Teams' Chat Rooms</h3>
            <div className="team-chat-rooms">
              {chatRooms.filter(room => room.team !== "General").map(room => (
                <div key={room.id} className="chat-room">
                  <img src={room.logoUrl} alt={`${room.team} Logo`} />
                  <a href={`/chatrooms/${room.id}`}>{room.name}</a>
                </div>
              ))}
            </div>

            <h3>General Chat Room</h3>
            <div className="general-chat-rooms">
              {chatRooms.filter(room => room.team === "General").map(room => (
                <div key={room.id} className="chat-room">
                  <a href={`/chatrooms/${room.id}`}>{room.name}</a>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        {/* <aside className="sidebar right-sidebar">
          <div className="user-info">
            <h3>Your Profile</h3>
            <p><strong>Username:</strong> {profileData?.username}</p>
            <p><strong>Email:</strong> {profileData?.email}</p>
          </div>

          <div className="quick-links">
            <h3>Quick Links</h3>
            <a href="/private-chats">Start a Private Chat</a>
          </div>
        </aside> */}
      </div>
    </div>
  );
};

export default Home;