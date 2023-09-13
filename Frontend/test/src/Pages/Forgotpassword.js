import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
 
} from "@mui/material";
import { LockOutlined, CheckCircleOutline } from "@mui/icons-material"; // Import LockOutlined and CheckCircleOutline icons
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
const Forgotpassword = () => {
  const nav = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [showResetSuccess, setShowResetSuccess] = useState(false);


const handlePasswordReset = () => {
  if (newPassword === "" || confirmPassword === "") {
    message.error("Please enter both the new password and confirm password.");
  } else if (newPassword === confirmPassword) {
    // Send the new password data and email in the request body
    axios
      .put(`http://localhost:3002/forgot/${Email}`, { newPassword })
      .then(response => {
        setShowResetSuccess(true);
        setTimeout(() => {
          nav("/login");
        }, 2000);
      })
      .catch(error => {
        console.error("Error updating password:", error);
        message.error("Password update failed. Please try again.");
      });
  } else {
    message.error("Passwords do not match");
  }
};



  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "2rem" }}>
        {!showResetSuccess ? (
          <div>
            <Typography variant="h6" gutterBottom>
              <LockOutlined fontSize="large" /> Reset Your Password
            </Typography>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={Email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePasswordReset}
              fullWidth
              style={{ marginTop: "1rem" }}>
              Reset Password{" "}
              <CheckCircleOutline style={{ marginLeft: "0.5rem" }} />
            </Button>
          </div>
        ) : (
          <div>
            <Typography variant="h6" gutterBottom>
              <CheckCircleOutline fontSize="large" /> Password Reset Successful
            </Typography>
            <Typography variant="body1" paragraph>
              Your password has been reset. You will be redirected to the login
              page shortly.
            </Typography>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default Forgotpassword;
