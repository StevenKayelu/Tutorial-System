// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import StudentDashboard from "./pages/students/StudentDashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import StudentProfile from "./pages/students/StudentProfile.jsx";
import AdminProfile from "./pages/Admin/AdminProfile.jsx";
import DocumentViewer from "./pages/students/Payment.jsx";
import CourseManagement from "./pages/admin/CourseManagement";
import PaymentManagement from "./pages/Admin/PaymentManagement.jsx";
import UserManagement from "./pages/Admin/UserManagement.jsx";
import CourseTopicsPage from "./pages/Admin/CourseTopicsPage.jsx";
import TopicDetailsPage from "./pages/Admin/TopicDetailsPage.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import NotificationManager from "./pages/Admin/NotificationManager.jsx";
import StudentLayout from "./layout/StudentLayout.jsx"
import CourseDetails from "./pages/students/CourseDetails.jsx";
import CourseList from "./pages/students/CourseList.jsx";
import Payment from "./pages/students/Payment.jsx"
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          
          <Route path="student/" element={<StudentLayout/>}>
            <Route index element={<StudentDashboard/>}/>
            <Route path="tutorials" element={<CourseList/>} />
            <Route path="studentprofile" element={<StudentProfile />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="course/:id" element={<CourseDetails />} />
            <Route path="payment" element={<Payment />} />
          </Route>

          <Route path="admin/" element={<AdminLayout />}>
            <Route index element={<AdminDashboard/>}/>
            <Route path="courses" element={<CourseManagement />} />
            <Route path="payment-management" element={<PaymentManagement />} />
            <Route path="user-management" element={<UserManagement/>} />
            <Route path="course/:courseIndex/topics" element={<CourseTopicsPage />} />
            <Route path="notifications" element={<NotificationManager/>}/>
            <Route path="course/:courseIndex/topic/:topicIndex" element={<TopicDetailsPage />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
      </Route> 

      </Routes>
    </Router>
  );
}
export default App;