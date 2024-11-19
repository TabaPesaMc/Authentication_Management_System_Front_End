import React from "react";
import "./profile.css"; // Optional CSS for styling

const Profile = ({ profileData }) => {
  return (
    <div className="profile">
      <h2>Welcome, {profileData?.username}!</h2>
      <p>Favorite Team: <strong>{profileData?.favoriteTeam}</strong></p>
      <img
        src={profileData?.teamLogoUrl}
        alt={`${profileData?.favoriteTeam} Logo`}
        className="team-logo"
      />
    </div>
  );
};

export default Profile;
