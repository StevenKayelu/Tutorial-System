// src/components/AdminNavBar.js
import React, { useState } from "react";
import { AppBar, Toolbar, Button, IconButton, Box, Drawer, List, ListItem, ListItemText, Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

function AdminNavBar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  // Dummy user data for Admin
  const admin = {
    name: "Admin User",
    email: "admin@example.com",
    phone: "098-765-4321",
    address: "456 Admin St, City, Country",
    profilePicture: "https://i.pravatar.cc/150?img=5", // Random profile picture
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
    navigate("/admin/profile");
    setMenuAnchorEl(null); // Close the menu after navigating
  };

  // Handle logout (clear session, redirect to login)
  const handleLogout = () => {
    // You can add your logout logic here (e.g., clearing session or token)
    navigate("/"); // Redirect to login page
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
              <Button color="inherit" onClick={() => navigate("/admin")}>Dashboard</Button>
              <Button color="inherit" onClick={() => navigate("/admin/courses")}>Course Management</Button>
              <Button color="inherit" onClick={() => navigate("/admin/user-management")}>User Management</Button>
              <Button color="inherit" onClick={() => navigate("/admin/payment-management")}>Payment Management</Button>
              <Button color="inherit" onClick={() => navigate("/admin/notifications")}>Notifications</Button>
            </Box>

            {/* Profile Section - Top Right */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                alt={admin.name}
                src={admin.profilePicture}
                onClick={handleProfileClick} // Open the menu when clicked
                sx={{ cursor: 'pointer', marginLeft: '16px' }}
              />
              <div style={{ marginLeft: '8px', color: 'white' }}>
                <span>{admin.name}</span>
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
          <ListItem button onClick={() => navigate("/admin")}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => navigate("/admin/courses")}>
            <ListItemText primary="Course Management" />
          </ListItem>
          <ListItem button onClick={() => navigate("/admin/user-management")}>
            <ListItemText primary="User Management" />
          </ListItem>
          <ListItem button onClick={() => navigate("/admin/payment-management")}>
            <ListItemText primary="Payment Management" />
          </ListItem>
          <ListItem button onClick={() => navigate("/admin/notifications")}>
            <ListItemText primary="Notifications" />
          </ListItem>
        </List>
      </Drawer>

      {/* Profile Menu for Profile Click (top right) */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewProfile}>Show Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

export default AdminNavBar;
