import React, { useState } from "react";
import axios from "axios";
import { showAlert } from "../../components/shared";
import CircularProgress from "@mui/material/CircularProgress";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailData, setEmailData] = useState({ email: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `/auth/forgot-password?email=${encodeURIComponent(emailData.email)}`
      );
      showAlert("success", response.data);
      setMessage("A reset link has been sent to your email!");
    } catch (error) {
      showAlert(
        "error",
        error.response?.data || "An error occurred. Please try again."
      );
      setMessage("Please enter a valid email address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password">
      <form onSubmit={handlePasswordReset}>
        <h2>Reset Password</h2>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={emailData.email}
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
            "Send Reset Link"
          )}
        </button>

        {/* <button type="submit">Send Reset Link</button> */}
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
