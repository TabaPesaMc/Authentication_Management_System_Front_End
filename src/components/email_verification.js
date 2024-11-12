import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { showAlert } from "./shared/messages/message_dialog";
import CircularProgress from "@mui/material/CircularProgress";

const EmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`/auth/verify-email?token=${token}`);
      setMessage("Account verified successfully! Redirecting to login...");
      setStatus("success");
      showAlert("success", response.data);

      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (error) {
      setMessage("Verification failed. Please try again or contact support.");
      setStatus("error");
      showAlert(
        "error",
        error.response?.data || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-verification">
      <h2>Email Verification</h2>
      <p>{message}</p>
      {status === "" && (
        // <button onClick={() => navigate("/register")}>Go Back to Register</button>
        <button
          type="submit"
          onClick={handleVerification}
          disabled={loading}
          className="email-verification-button"
        >
          {loading ? (
            <CircularProgress
              size={30}
              style={{ color: "#ffffff", marginLeft: "8px" }}
            />
          ) : (
            "Go Back to Register"
          )}
        </button>
      )}
      {status === "success" ? (
        <p>Redirecting to login page...</p>
      ) : (
        // <button onClick={handleVerification}>Verify Account Creation</button>
        <button
          onClick={handleVerification}
          type="submit"
          disabled={loading}
          className="email-verification-button"
        >
          {loading ? (
            <CircularProgress
              size={30}
              style={{ color: "#ffffff", marginLeft: "8px" }}
            />
          ) : (
            "Verify Account Creation"
          )}
        </button>
      )}
    </div>
  );
};

export default EmailVerification;
