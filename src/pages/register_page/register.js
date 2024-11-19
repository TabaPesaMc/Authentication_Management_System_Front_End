import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../../components/shared";
import CircularProgress from "@mui/material/CircularProgress";

const Register = () => {
  const [teams, setTeams] = useState([]);

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    contactNumber: "",
    teamId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [hasAccount, setHasAccount] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/teams"); // Adjust endpoint if needed
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams", error);
      }
    };
    fetchTeams();
  }, []);

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle team selection from dropdown
  const handleTeamChange = (e) => {
    console.log("*********", registerData);

    setRegisterData({
      ...registerData,
      teamId: e.target.value, // Set the teamId selected by the user
    });
  };

  const handleAccountToggle = () => {
    setHasAccount(!hasAccount);
    if (!hasAccount) {
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/auth/register", registerData);
      showAlert("success", response.data);
      console.log("Registration successful:", response);
      // navigate('/verify-email');
      // navigate(`/verify-email?token=${response.data.token}`);
    } catch (error) {
      showAlert("success!", error.response.data);
      console.error("Error registering:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up for the Ultimate Football Experience!</h2>
        <p>
          Join the fan base, discuss live matches, and engage in all things
          football.
        </p>

        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Pick your team alias"
            value={registerData.username}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={registerData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            placeholder="Phone for match alerts"
            value={registerData.contactNumber}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Team Name:</label>
          <select
            name="teamId"
            onChange={handleTeamChange}
            value={registerData.teamId}
          >
            <option value="" disabled>
            -- Select Team --
            </option>
            {teams.map((team) => (
              <option key={team.teamId} value={team.teamId}>
                {team.teamName}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Choose your passcode to enter the stadium"
            value={registerData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading} className="login-button">
          {loading ? (
            <CircularProgress
              size={30}
              style={{ color: "#ffffff", marginLeft: "8px" }}
            />
          ) : (
            "Register"
          )}
        </button>

        {/* <button type="submit">Register</button> */}

        <div style={{ marginTop: "10px" }}>
          <input
            type="checkbox"
            checked={hasAccount}
            onChange={handleAccountToggle}
          />
          <label style={{ marginLeft: "5px" }}>I already have an account</label>
        </div>
      </form>

      {/* Use Modal component for messages
       <Modal 
        message={message} 
        isError={isError} 
        onClose={closeModal} 
      /> */}
    </div>
  );
};
export default Register;
