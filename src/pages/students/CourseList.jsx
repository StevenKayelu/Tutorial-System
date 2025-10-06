import React from "react";
import { Link } from "react-router-dom"; // For navigation
import { Grid, Card, CardContent, Typography, List, ListItem, ListItemText, Button } from "@mui/material";

// Dummy data for courses
const courses = [
  {
    id: 1,
    title: "Introduction to Algebra",
    description: "Learn the basics of Algebra."
  },
  {
    id: 2,
    title: "Calculus 101",
    description: "Fundamentals of Calculus."
  },
  {
    id: 3,
    title: "Linear Algebra",
    description: "Understanding vector spaces and matrix operations."
  },
  // More courses can be added here...
];

const CourseList = () => {
  return (
    <Grid container spacing={3} justifyContent="center" sx={{ marginTop: "20px" }}>
      <Grid item xs={12} md={8}>
        <Card sx={{ padding: "16px", boxShadow: 3, width: "100%" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Available Courses
            </Typography>
            <List>
              {courses.map((course) => (
                <ListItem key={course.id}>
                  <ListItemText
                    primary={<Link to={`/student/course/${course.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{course.title}</Link>}
                    secondary={course.description}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CourseList;
