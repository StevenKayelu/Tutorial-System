// src/pages/student/StudentProfile.js
import React, { useState } from "react";
import StudentNavBar from "../../components/StudentNavBar";
import { Container, Typography, TextField, Button, Box, Avatar } from "@mui/material";

function StudentProfile() {
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/150?img=7");

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
      <Container maxWidth="xs"> {/* Narrow the container size */}
        <Box sx={{ textAlign: "center", mt: 1 }}>
          {/* Profile Image */}
          <Avatar
            alt={fullName}
            src={profileImage}
            sx={{ width: 100, height: 100, margin: "0 auto" }} 
          />
          {/* Image upload button */}
          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 0 }}
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
          <Typography variant="h6" sx={{ mt: 1 }}>
            {fullName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {email}
          </Typography>
        </Box>

        {/* Profile Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Typography variant="h5" gutterBottom align="center">
            Update Profile
          </Typography>

          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            sx={{ mb: 0 }}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            sx={{ mb: 0 }} 
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 0 }} 
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1, mb:5, padding: "8px" }}
          >
            Update Profile
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default StudentProfile;
