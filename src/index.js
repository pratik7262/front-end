import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import UserState from "./contexts/userContext/UserState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
   <UserState>
      <App />
      </UserState>
    </ThemeProvider>
  </BrowserRouter>
);
