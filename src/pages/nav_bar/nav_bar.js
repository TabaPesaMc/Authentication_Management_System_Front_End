import React from "react";
import "./nav_bar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li><a href="/profile">Profile</a></li>
        <li><a href="/chatrooms">Chat Rooms</a></li>
        <li><a href="/private-chats">Private Chats</a></li>
        <li><a href="/notifications">Notifications</a></li>
        <li><a href="/settings">Settings</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
