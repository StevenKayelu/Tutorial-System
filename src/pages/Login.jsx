import React from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField label="Email" fullWidth margin="normal" />
      <TextField label="Password" type="password" fullWidth margin="normal" />
      <Button variant="contained" fullWidth onClick={() => navigate("/student")}>
        Login as Student
      </Button>
      <Button variant="outlined" fullWidth sx={{ marginTop: 2 }} onClick={() => navigate("/admin")}>
        Login as Admin
      </Button>
    </Container>
  );
}

export default Login;

