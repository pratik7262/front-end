import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import UserState from "./contexts/userContext/UserState";
import PropertyState from "./contexts/propertyContext/PropertyState";
import ModalState from "./contexts/modalContext/ModalSate";
import InvestState from "./contexts/investContext/InvestState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserState>
        <PropertyState>
          <ModalState>
            <InvestState>
              <App />
            </InvestState>
          </ModalState>
        </PropertyState>
      </UserState>
    </ThemeProvider>
  </BrowserRouter>
);
