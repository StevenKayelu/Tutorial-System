// src/pages/Register.js
import React from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <TextField label="Full Name" fullWidth margin="normal" />
      <TextField label="Email" fullWidth margin="normal" />
      <TextField label="Password" type="password" fullWidth margin="normal" />
      <Button variant="contained" fullWidth onClick={() => navigate("/student/dashboard")}>
        Register
      </Button>
    </Container>
  );
}

export default Register;