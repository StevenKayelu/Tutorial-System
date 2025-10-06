import React, { useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Button, List, ListItem, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // React Router for navigation

const courses = [
  {
    id: 1,
    title: "Introduction to Algebra",
    description: "Learn the basics of Algebra.",
    topics: [
      {
        id: 1,
        title: "Linear Equations",
        subtopics: [
          { id: 1, title: "Solving 1-variable equations", document: "link-to-document1.pdf" },
          { id: 2, title: "Solving 2-variable equations", document: "link-to-document2.pdf" }
        ]
      },
      {
        id: 2,
        title: "Polynomials",
        subtopics: [
          { id: 1, title: "Understanding Polynomials", document: "link-to-document3.pdf" }
        ]
      }
    ]
  },
  // Add more courses here...
];

const StudentDashboard = () => {
  const [openCourses, setOpenCourses] = useState(false);

  const navigate=useNavigate();

  return (
    <Box sx={{ padding: "20px", width: "100%", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" gutterBottom>
        Student Dashboard
      </Typography>

      {/* Recent Notifications */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card sx={{ padding: "16px", boxShadow: 3, width: "100%",  textAlign:"center" }}>
            <CardContent>
              <Typography variant="h6">Recent Notifications</Typography>
              <Typography color="textSecondary">No new notifications</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Available Courses */}
      <Grid container spacing={3} justifyContent="center" sx={{ marginTop: "20px", textAlign:"center" }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ padding: "16px", boxShadow: 3, width: "100%" }}>
            <CardContent>
              <Typography variant="h6">Available Courses</Typography>
              <Typography color="textSecondary">5 new courses available this week</Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: "10px" }} onClick={()=>navigate("/student/courses")}>
                {openCourses ? "Hide Courses" : "View Courses"}
              </Button>

              {/* Show List of Courses if openCourses is true */}
              {openCourses && (
                <List sx={{ marginTop: "20px" }}>
                  {courses.map((course) => (
                    <ListItem key={course.id}>
                      <ListItemText
                        primary={<Link to={`/course/${course.id}`}>{course.title}</Link>}
                        secondary={course.description}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Subscription Details */}
      <Grid container spacing={3} justifyContent="center" sx={{ marginTop: "20px", textAlign:"center" }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ padding: "16px", boxShadow: 3, width: "100%" }}>
            <CardContent>
              <Typography variant="h6">Your Subscription</Typography>
              <Typography color="textSecondary">Subscribed to: Math, Physics</Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: "10px" }}>
                Manage Subscription
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
