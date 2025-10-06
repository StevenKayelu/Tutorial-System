import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography, Grid, Button, Divider } from "@mui/material";

const AdminDashboard = () => {
  return (
    <Box
      sx={{
        textAlign:"center",
        padding: { xs: "20px", sm: "30px" }, // Responsive padding
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto", // Center the content horizontally
      }}
    >
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Welcome to the Admin Dashboard. Here you can manage users, courses, payments, and more.
      </Typography>

      {/* Analytics Section */}
      <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
        Analytics Overview
      </Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ marginBottom: "40px" }}>
        {/* Total Students Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "150px", padding: "16px", margin: "8px", boxShadow: 3, borderRadius: "8px", backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6">Total Students</Typography>
              <Typography variant="h5" color="primary">
                500 {/* Replace with dynamic value from API or state */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Paid Students Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "150px", padding: "16px", margin: "8px", boxShadow: 3, borderRadius: "8px", backgroundColor: "#dff0d8" }}>
            <CardContent>
              <Typography variant="h6">Paid Students</Typography>
              <Typography variant="h5" color="green">
                350 {/* Replace with dynamic value from API or state */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Unpaid Students Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "150px", padding: "16px", margin: "8px", boxShadow: 3, borderRadius: "8px", backgroundColor: "#f2dede" }}>
            <CardContent>
              <Typography variant="h6">Unpaid Students</Typography>
              <Typography variant="h5" color="red">
                150 {/* Replace with dynamic value from API or state */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Divider between Analytics and Management Section */}
      <Divider sx={{ marginBottom: "40px", borderBottomWidth: 2 }} />

      {/* Management Section */}
      <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
        Management Section
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {/* Overview Card for User Management */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "150px", padding: "16px", margin: "8px", boxShadow: 3, borderRadius: "8px", backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6">User Management</Typography>
              <Typography variant="body2" color="textSecondary">
                Manage and view all user accounts.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="user-management"
                fullWidth
              >
                View Users
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Overview Card for Course Management */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "150px", padding: "16px", margin: "8px", boxShadow: 3, borderRadius: "8px", backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6">Course Management</Typography>
              <Typography variant="body2" color="textSecondary">
                Add, update, and manage courses and topics.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="courses"
                fullWidth
              >
                Manage Courses
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Overview Card for Payment Management */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "150px", padding: "16px", margin: "8px", boxShadow: 3, borderRadius: "8px", backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6">Payment Management</Typography>
              <Typography variant="body2" color="textSecondary">
                Track and manage payment records.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="payment-management"
                fullWidth
              >
                Manage Payments
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Overview Card for Notifications */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "150px", padding: "16px", margin: "8px", boxShadow: 3, borderRadius: "8px", backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6">Notifications</Typography>
              <Typography variant="body2" color="textSecondary">
                Send notifications to users regarding updates.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="notifications"
                fullWidth
              >
                Manage Notifications
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
