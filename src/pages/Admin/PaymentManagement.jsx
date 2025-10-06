import React, { useState, useEffect } from "react";
import AdminNavBar from "../../components/AdminNavBar";
import { Container, Typography, Paper, Grid, Select, MenuItem, TextField, Box, Button, Alert } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function PaymentManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const coursePrices = {
    Math: 100,
    Physics: 120,
    Chemistry: 110,
  };

  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchError, setSearchError] = useState(""); 
  const [payments, setPayments] = useState([
    { transactionId: "TXN12345", student: "John Doe", courses: { Math: "Completed", Physics: "Pending", Chemistry: "Completed" }, approved: true, startDate: "2025-01-01" },
    { transactionId: "TXN12346", student: "Jane Smith", courses: { Math: "Completed", Physics: "Completed", Chemistry: "Pending" }, approved: false, startDate: "" },
    { transactionId: "", student: "John Jean", courses: { Math: "Completed", Physics: "Completed", Chemistry: "Completed" }, approved: false, startDate: "" },
    { transactionId: "", student: "Sam Lee", courses: { Math: "Pending", Physics: "Pending", Chemistry: "Pending" }, approved: false, startDate: "" },
  ]);

  const calculateAmountPaid = (courses) => {
    return Object.keys(courses).reduce((total, course) => {
      if (courses[course] === "Completed") {
        total += coursePrices[course] || 0;  
      }
      return total;
    }, 0);
  };

  const handleStatusChange = (transactionId, course, newStatus) => {
    setPayments(payments.map(payment => 
      payment.transactionId === transactionId 
        ? { ...payment, courses: { ...payment.courses, [course]: newStatus } }
        : payment
    ));
  };

  const handleApproval = (transactionId) => {
    setPayments(payments.map(payment =>
      payment.transactionId === transactionId
        ? { ...payment, approved: true, startDate: new Date().toISOString().split('T')[0] }
        : payment
    ));
  };

  const handleReject = (transactionId) => {
    setPayments(payments.map(payment =>
      payment.transactionId === transactionId
        ? { ...payment, approved: false, startDate: "", transactionId: "" }
        : payment
    ));
  };

  const handleDisapprove = (transactionId) => {
    setPayments(payments.map(payment =>
      payment.transactionId === transactionId
        ? { ...payment, approved: false, startDate: "", transactionId: "" }
        : payment
    ));
  };

  const filteredPayments = payments.filter(payment => {
    const fullName = payment.student.toLowerCase();
    const searchTerm = searchQuery.toLowerCase();
    return fullName.includes(searchTerm);
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const searchResults = filteredPayments.filter(payment => 
      payment.student.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (e.target.value && searchResults.length === 0) {
      setSearchError("No such record found");
    } else {
      setSearchError("");
    }
  };

  const paidStudents = filteredPayments.filter(payment => payment.transactionId && payment.approved);
  const pendingStudents = filteredPayments.filter(payment => payment.transactionId && !payment.approved);
  const unpaidStudents = filteredPayments.filter(payment => !payment.transactionId);

  const calculateExpiryDate = (startDate) => {
    if (!startDate) return null;
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + 3);
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <Paper elevation={3} style={{ padding: "10px", width: "100%", textAlign:"center" }}>
        <Typography variant="h4" gutterBottom align="center">
          Payment Management
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Search by First or Last Name"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
          />
        </Box>

        {searchError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {searchError}
          </Alert>
        )}

        {/* Paid Students Section */}
        <Typography variant="h5" gutterBottom sx={{ backgroundColor: "#388e3c", color: "#fff", padding: "5px" }}>
          Paid Students
        </Typography>
        <Grid container spacing={2} justifyContent="center" style={{ width: "100%" }}>
          {paidStudents.map((payment) => {
            const amountPaid = calculateAmountPaid(payment.courses); 
            const expiryDate = calculateExpiryDate(payment.startDate);
            return (
              <Grid item xs={12} sm={6} md={4} key={payment.transactionId}>
                <Paper style={{ padding: "10px", textAlign: "center", backgroundColor: "#e8f5e9" }}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Transaction ID:</strong> {payment.transactionId}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" style={{ color: "#388e3c" }}>
                    <strong>Amount Paid:</strong> ${amountPaid.toFixed(2)}
                  </Typography>
                  <Typography variant="h6" style={{ marginTop: "8px" }}>
                    {payment.student}
                  </Typography>

                  {Object.keys(payment.courses).map((course) => (
                    <div key={`${payment.transactionId}-${course}`} style={{ marginTop: "5px" }}>
                      <Typography variant="subtitle1">{course}</Typography>
                      <Select
                        value={payment.courses[course]}
                        onChange={(e) => handleStatusChange(payment.transactionId, course, e.target.value)}
                        fullWidth
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                    </div>
                  ))}

                  {expiryDate && (
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
                      <strong>Expiry Date:</strong> {expiryDate}
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDisapprove(payment.transactionId)}
                    style={{ marginTop: "10px" }}
                  >
                    Disapprove
                  </Button>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Pending Students Section */}
        <Typography variant="h5" gutterBottom sx={{ backgroundColor: "#ff9800", color: "#fff", padding: "5px", mt: 4 }}>
          Pending Students
        </Typography>
        <Grid container spacing={2} justifyContent="center" style={{ width: "100%" }}>
          {pendingStudents.map((payment) => {
            const amountPaid = calculateAmountPaid(payment.courses);  
            return (
              <Grid item xs={12} sm={6} md={4} key={payment.transactionId}>
                <Paper style={{ padding: "10px", textAlign: "center", backgroundColor: "#fff3e0" }}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Transaction ID:</strong> {payment.transactionId}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" style={{ color: "#ff9800" }}>
                    <strong>Amount Paid:</strong> ${amountPaid.toFixed(2)}
                  </Typography>
                  <Typography variant="h6" style={{ marginTop: "8px" }}>
                    {payment.student}
                  </Typography>
                  {Object.keys(payment.courses).map((course) => (
                    <div key={`${payment.transactionId}-${course}`} style={{ marginTop: "5px" }}>
                      <Typography variant="subtitle1">{course}</Typography>
                      <Select
                        value={payment.courses[course]}
                        onChange={(e) => handleStatusChange(payment.transactionId, course, e.target.value)}
                        fullWidth
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                    </div>
                  ))}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleApproval(payment.transactionId)}
                    style={{ marginTop: "10px" }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleReject(payment.transactionId)}
                    style={{ marginTop: "10px", marginLeft: "10px" }}
                  >
                    Reject
                  </Button>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Unpaid Students Section */}
        <Typography variant="h5" gutterBottom sx={{ backgroundColor: "#f44336", color: "#fff", padding: "5px", mt: 4 }}>
          Unpaid Students
        </Typography>
        <Grid container spacing={2} justifyContent="center" style={{ width: "100%" }}>
          {unpaidStudents.map((payment) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={payment.student}>
                <Paper style={{ padding: "10px", textAlign: "center", backgroundColor: "#ffebee" }}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Transaction ID:</strong> Not Available
                  </Typography>
                  <Typography variant="h6" style={{ marginTop: "8px" }}>
                    {payment.student}
                  </Typography>

                  {Object.keys(payment.courses).map((course) => (
                    <div key={`${payment.student}-${course}`} style={{ marginTop: "5px" }}>
                      <Typography variant="subtitle1">{course}</Typography>
                    </div>
                  ))}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </>
  );
}

export default PaymentManagement;
