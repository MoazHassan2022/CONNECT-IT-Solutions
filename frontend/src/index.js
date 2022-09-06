import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./Utalites/Theme";
import { BrowserRouter } from "react-router-dom";
import "./index.css"

ReactDOM.render(
  <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

