// src/pages/admin/TopicDetailsPage.js
import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Box, IconButton, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FaTrash, FaEdit, FaPlusCircle, FaUpload } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { PlayCircleOutline } from '@mui/icons-material'; // Play icon for "Watch"

const TopicDetailsPage = () => {
  const { courseIndex, topicIndex } = useParams();
  const navigate = useNavigate();

  // Dummy data for links and documents under a topic
  const [topic, setTopic] = useState({
    links: [
      { id:1, url: "https://facebook.com/course1", subtopic: "Introduction", platform: "facebook" },
      { id:2, url: "https://youtube.com/course1", subtopic: "Overview", platform: "youtube" }
    ],
    documents: [
      { id:1, url: "/documents/document1.pdf", subtopic: "Lecture 1" },
      { id:2,  url: "/documents/document2.docx", subtopic: "Lecture 2" },
      { id:3, url: "/documents/presentation.pptx", subtopic: "Presentation" }
    ]
  });

  const [editLinkDialogOpen, setEditLinkDialogOpen] = useState(false);
  const [editDocDialogOpen, setEditDocDialogOpen] = useState(false);
  const [addLinkDialogOpen, setAddLinkDialogOpen] = useState(false);
  const [addDocDialogOpen, setAddDocDialogOpen] = useState(false);
  
  const [currentLinkIndex, setCurrentLinkIndex] = useState(null);
  const [currentDocIndex, setCurrentDocIndex] = useState(null);

  const [editedLinkUrl, setEditedLinkUrl] = useState("");
  const [editedLinkSubtopic, setEditedLinkSubtopic] = useState("");
  const [editedDocName, setEditedDocName] = useState("");
  const [editedDocSubtopic, setEditedDocSubtopic] = useState("");
  const [file, setFile] = useState(null);

  // Functions for handling dialogs and operations
  const handleEditLink = (index) => {
    setCurrentLinkIndex(index);
    setEditedLinkUrl(topic.links[index].url);
    setEditedLinkSubtopic(topic.links[index].subtopic);
    setEditLinkDialogOpen(true);
  };

  const handleEditDoc = (index) => {
    setCurrentDocIndex(index);
    setEditedDocName(topic.documents[index].name);
    setEditedDocSubtopic(topic.documents[index].subtopic);
    setEditDocDialogOpen(true);
  };

  const handleSaveEditedLink = () => {
    const updatedLinks = [...topic.links];
    updatedLinks[currentLinkIndex].url = editedLinkUrl;
    updatedLinks[currentLinkIndex].subtopic = editedLinkSubtopic;
    setTopic((prev) => ({ ...prev, links: updatedLinks }));
    setEditLinkDialogOpen(false);
  };

  const handleSaveEditedDoc = () => {
    const updatedDocs = [...topic.documents];
    updatedDocs[currentDocIndex].name = editedDocName;
    updatedDocs[currentDocIndex].subtopic = editedDocSubtopic;
    setTopic((prev) => ({ ...prev, documents: updatedDocs }));
    setEditDocDialogOpen(false);
  };

  const handleDeleteLink = (index) => {
    const updatedLinks = topic.links.filter((_, i) => i !== index);
    setTopic((prev) => ({ ...prev, links: updatedLinks }));
  };

  const handleDeleteDoc = (index) => {
    const updatedDocs = topic.documents.filter((_, i) => i !== index);
    setTopic((prev) => ({ ...prev, documents: updatedDocs }));
  };

  const handleAddLink = () => {
    setAddLinkDialogOpen(true);
  };

  const handleAddDoc = () => {
    setAddDocDialogOpen(true);
  };

  const handleSaveNewLink = () => {
    const newLink = { name: "New Link", url: editedLinkUrl, subtopic: editedLinkSubtopic, platform: "youtube" };
    setTopic((prev) => ({ ...prev, links: [...prev.links, newLink] }));
    setAddLinkDialogOpen(false);
  };

  const handleSaveNewDoc = () => {
    const newDoc = { name: editedDocName, url: file ? URL.createObjectURL(file) : "#", subtopic: editedDocSubtopic, type: "pdf" };
    setTopic((prev) => ({ ...prev, documents: [...prev.documents, newDoc] }));
    setAddDocDialogOpen(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Manage Topic: {topicIndex}</Typography>

      {/* Links Section */}
      <Typography variant="h6" sx={{ marginTop: 4 }}>Links</Typography>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {topic.links.map((link, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Button to redirect to the link */}
                    <Button 
                      variant="contained"
                      color="primary"
                      onClick={() => window.open(link.url, "_blank")}
                      style={{ fontSize: '14px' }}
                    >
                      WATCH<PlayCircleOutline />
                    </Button>

                    {/* Delete Button */}
                    <IconButton onClick={() => handleDeleteLink(index)} style={{ marginLeft: '10px' }}>
                      <FaTrash style={{ fontSize: '16px' }} />
                    </IconButton>

                    {/* Edit Button */}
                    <IconButton onClick={() => handleEditLink(index)} style={{ marginLeft: '10px' }}>
                      <FaEdit style={{ fontSize: '16px' }} />
                    </IconButton>
                  </div>
                  {/* Subtopic */}
                  <Typography variant="body2">{link.subtopic}</Typography>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button variant="outlined" startIcon={<FaPlusCircle />} sx={{ marginTop: 4 }} onClick={handleAddLink}>
        Add New Link
      </Button>

      {/* Documents Section */}
      <Typography variant="h6" sx={{ marginTop: 4 }}>Documents</Typography>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {topic.documents.map((doc, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h6">{doc.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Button to open the document */}
                    <Button 
                      variant="contained"
                      color="primary"
                      onClick={() => window.open(doc.url, "_blank")}
                      style={{ fontSize: '14px' }}
                    >
                      Open Document
                    </Button>

                    {/* Delete Button */}
                    <IconButton onClick={() => handleDeleteDoc(index)} style={{ marginLeft: '10px' }}>
                      <FaTrash style={{ fontSize: '16px' }} />
                    </IconButton>

                    {/* Edit Button */}
                    <IconButton onClick={() => handleEditDoc(index)} style={{ marginLeft: '10px' }}>
                      <FaEdit style={{ fontSize: '16px' }} />
                    </IconButton>
                  </div>
                  {/* Subtopic */}
                  <Typography variant="body2">{doc.subtopic}</Typography>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button variant="outlined" startIcon={<FaUpload />} sx={{ marginTop: 4 }} onClick={handleAddDoc}>
        Upload Document
      </Button>

      {/* Add/Edit Link Dialog */}
      <Dialog open={addLinkDialogOpen || editLinkDialogOpen} onClose={() => { setAddLinkDialogOpen(false); setEditLinkDialogOpen(false); }} maxWidth="sm" fullWidth>
        <DialogTitle>{addLinkDialogOpen ? "Add New Link" : "Edit Link"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Link URL"
            variant="outlined"
            fullWidth
            value={editedLinkUrl}
            onChange={(e) => setEditedLinkUrl(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Subtopic"
            variant="outlined"
            fullWidth
            value={editedLinkSubtopic}
            onChange={(e) => setEditedLinkSubtopic(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setAddLinkDialogOpen(false); setEditLinkDialogOpen(false); }} color="secondary">
            Cancel
          </Button>
          <Button onClick={addLinkDialogOpen ? handleSaveNewLink : handleSaveEditedLink} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Document Dialog */}
      <Dialog open={addDocDialogOpen || editDocDialogOpen} onClose={() => { setAddDocDialogOpen(false); setEditDocDialogOpen(false); }} maxWidth="sm" fullWidth>
        <DialogTitle>{addDocDialogOpen ? "Upload Document" : "Edit Document"}</DialogTitle>
        <DialogContent>
          {addDocDialogOpen && (
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          )}
          <TextField
            label="Subtopic"
            variant="outlined"
            fullWidth
            value={editedDocSubtopic}
            onChange={(e) => setEditedDocSubtopic(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setAddDocDialogOpen(false); setEditDocDialogOpen(false); }} color="secondary">
            Cancel
          </Button>
          <Button onClick={addDocDialogOpen ? handleSaveNewDoc : handleSaveEditedDoc} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TopicDetailsPage;
