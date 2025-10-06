// src/pages/admin/UserManagement.js
import React, { useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from "@mui/material";
import AdminNavBar from "../../components/AdminNavBar";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Jake White", email: "jake@example.com" }
  ]);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editUser, setEditUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpen = (user = null) => {
    setEditUser(user);
    setNewUser(user ? { name: user.name, email: user.email } : { name: "", email: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditUser(null);
  };

  const handleSave = () => {
    if (editUser) {
      setUsers(users.map((u) => (u.id === editUser.id ? { ...u, ...newUser } : u)));
    } else {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (<>
      <Container sx={{ maxWidth: "lg", padding: 3 }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        label="Search Users"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Add User Button */}
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ mb: 3 }}>
        Add User
      </Button>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleOpen(user)}>Edit</Button>
                  <Button color="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Display error message if no results found */}
      {filteredUsers.length === 0 && (
        <Box sx={{ mt: 2, color: "red", textAlign: "center" }}>
          <Typography variant="body1">No users found matching your search criteria.</Typography>
        </Box>
      )}

      {/* Add/Edit User Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
</>);
};

export default UserManagement;
