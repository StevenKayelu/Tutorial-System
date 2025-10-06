// src/pages/student/StudentProfile.js
import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Avatar, Grid } from "@mui/material";

function AdminProfile() {
  const [fullName, setFullName] = useState("Admin User"); // Set to default or fetched from user data
  const [email, setEmail] = useState("admin@example.com"); // Set to default or fetched from user data
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/150?img=7"); // Placeholder profile image

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic (e.g., update profile)
  };

  // Handle profile image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL); // Update profile image preview
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", mt: 4 }}>
          {/* Profile Image */}
          <Avatar
            alt={fullName}
            src={profileImage}
            sx={{ width: 120, height: 120, margin: "0 auto" }}
          />
          {/* Image upload button */}
          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2 }}
          >
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </Button>

          {/* Name and Email */}
          <Typography variant="h5" sx={{ mt: 2 }}>
            {fullName}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {email}
          </Typography>
        </Box>

        {/* Profile Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Update Profile
          </Typography>

          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Update Profile
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default AdminProfile;
