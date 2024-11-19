import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showAlert } from "../../components/shared";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [hasNoAccount, setHasNoAccount] = useState(false);

  const handleAccountToggle = () => {
    setHasNoAccount(!hasNoAccount);
    if (!hasNoAccount) {
      navigate("/register");
    }
  };

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!loginData.username || !loginData.password) {
      alert("Username and password are required");
      return;
    }

    try {
      const response = await axios.post("/auth/login", loginData);
      console.log("Login successful:", response.data);

      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/home");
      } else {
        console.error("No token received, login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);

      showAlert("success!", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
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
            "Login"
          )}
        </button>

        <div style={{ marginTop: "10px" }}>
          <input
            type="checkbox"
            checked={hasNoAccount}
            onChange={handleAccountToggle}
          />
          <label style={{ marginLeft: "5px" }}>I don't have an account</label>
        </div>
        
        <div style={{ marginTop: "10px" }}>
          <button
            type="button"
            className="login-button"
            onClick={() => navigate("/forgot-password")}
            disabled={loading}
            style={{
              color: "white",
              textDecoration: "underline",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Forgot Password?
          </button>
        </div>
      </form>

      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Login;
