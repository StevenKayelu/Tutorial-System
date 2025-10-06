import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button, TextField, FormControlLabel, Checkbox, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { CheckCircle, Error, Payment } from "@mui/icons-material";

const courses = [
  { id: 1, title: "Mathematics 101", price: 50 },
  { id: 2, title: "Physics 101", price: 40 },
  { id: 3, title: "Chemistry 101", price: 60 },
];

const PaymentPage = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [transactionId, setTransactionId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Handle course selection
  const handleCourseSelect = (courseId) => {
    setSelectedCourses((prevState) =>
      prevState.includes(courseId)
        ? prevState.filter((id) => id !== courseId)
        : [...prevState, courseId]
    );
  };

  // Handle transaction ID input
  const handleTransactionIdChange = (event) => {
    setTransactionId(event.target.value);
  };

  // Open dialog box
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Close dialog box
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle payment submission
  const handleSubmitPayment = () => {
    setDisabled(true); // Disable the payment button after submission
    setPaymentStatus("Pending"); // Set payment status to "Pending"
    setSnackbarOpen(true); // Open snackbar to inform user about the pending status
    handleCloseDialog(); // Close dialog box
  };

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ marginTop: "20px" }}>
      {/* Course selection */}
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ marginBottom: "20px", textAlign: "center" }}>
          Select Courses to Pay For
        </Typography>
        <Grid container spacing={3} direction={{ xs: "column", md: "row" }}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card sx={{ padding: "16px", boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{course.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: ${course.price}
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => handleCourseSelect(course.id)}
                      />
                    }
                    label="Select Course"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Button to open transaction ID dialog */}
        {selectedCourses.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            sx={{ marginTop: "20px" }}
            disabled={disabled}
          >
            {disabled ? "Payment Pending" : "Proceed to Payment"}
          </Button>
        )}
      </Grid>

      {/* Payment Status */}
      {paymentStatus && (
        <Typography
          variant="h6"
          sx={{
            color: paymentStatus === "Pending" ? "red" : "blue",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          {paymentStatus === "Pending"
            ? "Payment is pending. Please wait for admin approval."
            : "Payment Approved!"}
        </Typography>
      )}

      {/* Snackbar notification for pending status */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Payment is pending. Please wait for admin approval."
        sx={{
          backgroundColor: "orange",
          color: "white",
          textAlign: "center",
        }}
      />

      {/* Dialog box to enter transaction ID */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Enter Transaction ID</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Transaction ID"
            type="text"
            fullWidth
            variant="outlined"
            value={transactionId}
            onChange={handleTransactionIdChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitPayment}
            color="primary"
            disabled={!transactionId} // Disable submit button if transaction ID is empty
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PaymentPage;
