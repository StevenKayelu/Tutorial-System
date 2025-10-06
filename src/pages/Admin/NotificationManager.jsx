import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const NotificationManager = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newNotification, setNewNotification] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New course 'Advanced Physics' has been added!" },
    { id: 2, message: "Topic 'Quantum Mechanics' updated in 'Physics 101'." },
    { id: 3, message: "Reminder: Complete your payment for 'Math 101' by this Friday." },
  ]);

  const handleClickOpen = (index = null) => {
    setEditIndex(index);
    setNewNotification(index !== null ? notifications[index].message : "");
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setEditIndex(null);
  };

  const handleSaveNotification = () => {
    if (newNotification.trim()) {
      if (editIndex !== null) {
        const updatedNotifications = [...notifications];
        updatedNotifications[editIndex].message = newNotification;
        setNotifications(updatedNotifications);
      } else {
        setNotifications([
          ...notifications,
          { id: notifications.length + 1, message: newNotification },
        ]);
      }
      setNewNotification("");
      handleClose();
    }
  };

  const handleDeleteNotification = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ padding: "20px", width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Manage Notifications
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Send and manage notifications to keep users updated on courses, topics, documents, and payments.
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={8}>
          <Card sx={{ padding: "16px", boxShadow: 3, borderRadius: "8px", backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Notifications
              </Typography>
              <List>
                {notifications.map((notification, index) => (
                  <ListItem
                    key={notification.id}
                    secondaryAction={
                      <Box display="flex" gap={1}>
                        <IconButton color="primary" onClick={() => handleClickOpen(index)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDeleteNotification(index)}>
                          <Delete />
                        </IconButton>
                      </Box>
                    }
                    sx={{
                      backgroundColor: "#e3f2fd",
                      marginBottom: "8px",
                      borderRadius: "8px",
                      padding: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <ListItemText primary={notification.message} sx={{ color: "#1565c0", flexGrow: 1 }} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: "16px" }}>
        <Grid item xs={12} sm={10} md={8} lg={8}>
          <Button variant="contained" color="primary" onClick={() => handleClickOpen()} fullWidth>
            Add New Notification
          </Button>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {editIndex !== null ? "Edit Notification" : "Add New Notification"}
        </DialogTitle>
        <DialogContent sx={{ padding: "24px" }}>
          <TextField
            label="Notification Message"
            fullWidth
            multiline
            rows={6}
            value={newNotification}
            onChange={(e) => setNewNotification(e.target.value)}
            sx={{ marginBottom: "16px" }}
          />
        </DialogContent>
        <DialogActions sx={{ padding: "16px" }}>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSaveNotification} color="primary" variant="contained">
            {editIndex !== null ? "Save Changes" : "Add Notification"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationManager;
