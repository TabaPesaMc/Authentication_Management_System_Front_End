import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="home">
      <h2>Welcome, {profileData?.username}!</h2>
      <p>Email: {profileData?.email}</p>
      <p>Contact Number: {profileData?.contactNumber}</p>
      {/* Additional sports chat features can go here */}
    </div>
  );
};

export default Home;
