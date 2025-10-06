// src/components/StudentNavBar.js
import React, { useState } from "react";
import { AppBar, Toolbar, Button, IconButton, Box, Drawer, List, ListItem, ListItemText, Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

function StudentNavBar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  // Dummy user data
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
    profilePicture: "https://i.pravatar.cc/150?img=3", // Random profile picture
  };

  // Toggle drawer (for mobile)
  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  // Open profile menu
  const handleProfileClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // Handle view profile navigation
  const handleViewProfile = () => {
    navigate("/student/studentprofile");
    setMenuAnchorEl(null); // Close the menu after navigating
  };

  // Handle logout (clear session, redirect to login)
  const handleLogout = () => {
    // You can add your logout logic here (e.g., clearing session or token)
    navigate("/login"); // Redirect to login page
    setMenuAnchorEl(null); // Close the menu after logout
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Main Content Section */}
      <Box sx={{ flex: 1, p: 3 }}>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Menu Icon for mobile screens */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer(true)}
              sx={{ display: { xs: 'block', sm: 'none' } }} // Only show on mobile
            >
              <MenuIcon />
            </IconButton>

            {/* Links for large and medium screens */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1 }}>
              <Button color="inherit" onClick={() => navigate("/student")}>Dashboard</Button>
              <Button color="inherit" onClick={() => navigate("/student/courses")}>Courses</Button>
              <Button color="inherit" onClick={() => navigate("/student/studentprofile")}>Profile</Button>
              <Button color="inherit" onClick={() => navigate("/student/payment")}>Payments</Button>
            </Box>

            {/* Profile Section - Top Right */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                alt={user.name}
                src={user.profilePicture}
                onClick={handleProfileClick} // Open the menu when clicked
                sx={{ cursor: 'pointer', marginLeft: '16px' }}
              />
              <div style={{ marginLeft: '8px', color: 'white' }}>
                <span>{user.name}</span>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Hamburger Menu for Mobile Screens */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          display: { xs: "block", sm: "none" }, // Only show on mobile
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          <ListItem button onClick={() => navigate("/student")}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => navigate("/student/courses")}>
            <ListItemText primary="Courses" />
          </ListItem>
          <ListItem button onClick={() => navigate("/student/studentprofile")}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={() => navigate("/student/payment")}>
            <ListItemText primary="Payments" />
          </ListItem>
        </List>
      </Drawer>

      {/* Profile Menu for Profile Click (top right) */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            width: 180, // Reduced the width of the menu
          },
        }}
      >
        <MenuItem onClick={handleViewProfile}>Show Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

export default StudentNavBar;
