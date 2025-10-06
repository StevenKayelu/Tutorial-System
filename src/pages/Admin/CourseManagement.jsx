// src/pages/admin/CourseManagement.js
import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Box, IconButton } from "@mui/material";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "../../components/AdminNavBar";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState("");
  const navigate = useNavigate();

  // Function to add a new course
  const handleAddCourse = () => {
    if (newCourseName) {
      setCourses([...courses, { name: newCourseName, topics: [] }]);
      setNewCourseName("");
    }
  };

  // Function to delete a course
  const handleDeleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
  };

  // Function to edit a course
  const handleEditCourse = (index) => {
    const updatedCourseName = prompt("Edit Course Name:", courses[index].name);
    if (updatedCourseName) {
      const updatedCourses = [...courses];
      updatedCourses[index].name = updatedCourseName;
      setCourses(updatedCourses);
    }
  };

  // Function to navigate to a course's topic management page
  const handleCourseClick = (courseIndex) => {
    navigate(`/admin/course/${courseIndex}/topics`);
  };

  return (<>
  <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Course Management</Typography>
      
      {/* Add Course Section */}
      <TextField
        label="New Course Name"
        variant="outlined"
        fullWidth
        value={newCourseName}
        onChange={(e) => setNewCourseName(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" onClick={handleAddCourse} sx={{ marginTop: 2 }}>
        Add New Course
      </Button>

      {/* Courses List */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2 }}>
              <Typography variant="h6">{course.name}</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button variant="outlined" onClick={() => handleCourseClick(index)}>
                  View Topics
                </Button>
                <div>
                  <IconButton onClick={() => handleEditCourse(index)}>
                    <FaEdit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCourse(index)}>
                    <FaTrash />
                  </IconButton>
                </div>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  </>);
};

export default CourseManagement;
