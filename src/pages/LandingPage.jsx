// src/pages/LandingPage.js
import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "./Login";

function LandingPage() {
  const navigate = useNavigate();

  return (<>
        <Outlet/>
  </>)
}

export default LandingPage;
