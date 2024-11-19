import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { showAlert } from "../../components/shared";
import CircularProgress from "@mui/material/CircularProgress";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const [resetData, setRegisterData] = useState({
    token: new URLSearchParams(location.search).get("token"),
    new_password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterData({
      ...resetData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `/auth/reset-password?token=${encodeURIComponent(
          resetData.token
        )}&newPassword=${encodeURIComponent(resetData.new_password)}`
      );
      setMessage("Account verified successfully! Redirecting to login...");
      // setStatus("success");
      showAlert("success", response.data);

      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (error) {
      setMessage("Verification failed. Please try again or contact support.");
      // setStatus("error");
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
      <h2>Reset Your Password </h2>
      <p>{message}</p>
      <div className="input-group">
        <label>New Password:</label>
        <input
          type="text"
          name="new_password"
          placeholder="Enter your new password"
          value={resetData.new_password}
          onChange={handleChange}
        />
      </div>
      {/* <button onClick={handleVerification}>Reset Password</button> */}

      <button
        type="submit"
        onClick={handleVerification}
        disabled={loading}
        className="login-button"
      >
        {loading ? (
          <CircularProgress
            size={30}
            style={{ color: "#ffffff", marginLeft: "8px" }}
          />
        ) : (
          "Reset Password"
        )}
      </button>

      {/* {status === "" && (
        <button onClick={() => navigate("/register")}>Go Back to Register</button>

            )}
      {status === "success" ? (
        <p>Redirecting to login page...</p>
      ) : (
        <button onClick={handleVerification}>Reset Password</button>

      )} */}
    </div>
  );
};

export default ResetPassword;
