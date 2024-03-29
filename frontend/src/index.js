import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./Utalites/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css"
import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import { CookiesProvider } from "react-cookie";

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CookiesProvider>
              <Routes>
                  <Route path="*" element={ <App /> } />
              </Routes>
          </CookiesProvider>
        </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
