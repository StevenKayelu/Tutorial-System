import React from "react";
import { useParams } from "react-router-dom"; // To get the course ID from URL
import { Grid, Card, CardContent, Typography, List, ListItem, ListItemText, Divider, IconButton } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

// Dummy data for courses (Replace this with API call in real-world scenario)
const courses = [
  {
    id: 1,
    title: "Introduction to Algebra",
    topics: [
      {
        id: 1,
        title: "Linear Equations",
        subtopics: [
          { id: 1, title: "Solving 1-variable equations", document: "link-to-document1.pdf" },
          { id: 2, title: "Solving 2-variable equations", document: "link-to-document2.pdf" },
          { id: 3, title: "Introduction to Linear Equations (Video)", video: "https://www.youtube.com/watch?v=abc123" }
        ]
      },
      {
        id: 2,
        title: "Polynomials and Logarithms incld",
        subtopics: [
          { id: 1, title: "Understanding Polynomials", document: "link-to-document3.pdf" },
          { id: 2, title: "Polynomials Basics (Video)", video: "https://www.youtube.com/watch?v=xyz789" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Calculus 101",
    topics: [
      {
        id: 1,
        title: "Limits and Continuity",
        subtopics: [
          { id: 1, title: "Understanding Limits", document: "link-to-document4.pdf" },
          { id: 2, title: "Limits Explanation (Video)", video: "https://www.youtube.com/watch?v=def456" }
        ]
      }
    ]
  },
  // Add more courses as necessary...
];

const CourseDetailPage = () => {
  const { id } = useParams(); // Get the course ID from URL

  // Find the course that matches the id from URL
  const course = courses.find(course => course.id === parseInt(id));

  // If the course doesn't exist, show a message
  if (!course) {
    return <Typography variant="h6">Course not found!</Typography>;
  }

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ marginTop: "20px", width: "100%" }}>
      {/* Main grid container takes full width */}
      <Grid item xs={12} sm={12} md={12}>
        <Card sx={{ padding: "16px", boxShadow: 3, width: "100%" }}>
          <CardContent>
            <Typography variant="h5">{course.title}</Typography>
            <Typography color="textSecondary" sx={{ marginBottom: "20px" }}>Course Topics</Typography>

            {/* Inner grid that flows in a row for large and medium screens, wrapping to the next line when necessary */}
            <Grid container spacing={2} direction="row" justifyContent="center" sx={{ flexWrap: "wrap", padding:"0px" }}>
              {course.topics.map((topic) => (
                <Grid item xs={12} sm={6} md={4} key={topic.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Card sx={{ padding: "20px", boxShadow: 2, width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "5px", textAlign: 'center' }}>{topic.title}</Typography>

                    {/* Display content inside the topic in a column layout */}
                    <Grid container spacing={1} direction="column" sx={{ alignItems: 'center' }}>
                      {/* Documents Section */}
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "0px", textAlign: 'center' }}>Documents</Typography>
                      <List sx={{ marginTop: "0px", padding: 0, textAlign: 'center' }}>
                        {topic.subtopics.filter(subtopic => subtopic.document).map((subtopic) => (
                          <ListItem key={subtopic.id} sx={{ padding: "0px 0", justifyContent: 'center' }}>
                            <ListItemText
                              primary={
                                <>
                                  <IconButton edge="start" sx={{ padding: 0, marginRight: "4px" }}>
                                    <InsertDriveFileIcon />
                                  </IconButton>
                                  <a href={subtopic.document} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#1976d2" }}>
                                    {subtopic.title}
                                  </a>
                                </>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>

                      <Divider sx={{ marginTop: "3px", width: '100%' }} />

                      {/* Video Links Section */}
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "0px", textAlign: 'center' }}>Video Links</Typography>
                      <List sx={{ marginTop: "0px", padding: 0, textAlign: 'center' }}>
                        {topic.subtopics.filter(subtopic => subtopic.video).map((subtopic) => (
                          <ListItem key={subtopic.id} sx={{ padding: "0px 0", justifyContent: 'center' }}>
                            <ListItemText
                              primary={
                                <>
                                  <IconButton edge="start" sx={{ padding: 0, marginRight: "4px" }}>
                                    <PlayCircleOutlineIcon />
                                  </IconButton>
                                  <a href={subtopic.video} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#1976d2" }}>
                                    {subtopic.title}
                                  </a>
                                </>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CourseDetailPage;
