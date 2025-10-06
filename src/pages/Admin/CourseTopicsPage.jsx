// src/pages/admin/CourseTopicsPage.js
import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Box, IconButton } from "@mui/material";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const CourseTopicsPage = () => {
  const { courseIndex } = useParams();
  const navigate = useNavigate();

  // Dummy data for topics under a course
  const [topics, setTopics] = useState([
    { name: "Topic 1", links: [], documents: [] },
    { name: "Topic 2", links: [], documents: [] },
  ]);

  const [newTopicName, setNewTopicName] = useState("");

  // Function to add a new topic
  const handleAddTopic = () => {
    if (newTopicName) {
      const updatedTopics = [...topics, { name: newTopicName, links: [], documents: [] }];
      setTopics(updatedTopics);
      setNewTopicName(""); // Reset after adding topic
    }
  };

  // Function to delete a topic
  const handleDeleteTopic = (index) => {
    const updatedTopics = topics.filter((_, i) => i !== index);
    setTopics(updatedTopics);
  };

  // Function to edit a topic
  const handleEditTopic = (index) => {
    const updatedTopicName = prompt("Edit Topic Name:", topics[index].name);
    if (updatedTopicName) {
      const updatedTopics = [...topics];
      updatedTopics[index].name = updatedTopicName;
      setTopics(updatedTopics);
    }
  };

  // Function to navigate to topic details page
  const handleTopicClick = (topicIndex) => {
    navigate(`/admin/course/${courseIndex}/topic/${topicIndex}`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Manage Topics</Typography>
      <TextField
        label="New Topic Name"
        variant="outlined"
        fullWidth
        value={newTopicName}
        onChange={(e) => setNewTopicName(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" onClick={handleAddTopic} sx={{ marginTop: 2 }}>
        Add New Topic
      </Button>

      {/* Topics List */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {topics.map((topic, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2 }}>
              <Typography variant="h6">{topic.name}</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button variant="outlined" onClick={() => handleTopicClick(index)}>
                  View Details
                </Button>
                <div>
                  <IconButton onClick={() => handleEditTopic(index)}>
                    <FaEdit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTopic(index)}>
                    <FaTrash />
                  </IconButton>
                </div>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseTopicsPage;
