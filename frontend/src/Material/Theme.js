import { createTheme } from "@mui/material/styles";
// const SilverColor = "#bdbdbd";
const GreyColor = "#999";
const theme = createTheme({
  palette: {
    primary: {
      main: "#f9a825",
    },
    secondary: {
      main: "#fb8c00",
    },
    text:{
      main: "#583E26",
    },
    button:{
      main: "#EC9704",
    }
  },
   
});
theme.typography.h1 = {
  fontFamily: "Roboto",
  fontWeight: "600",
};
theme.typography.h2 = {
  fontFamily: "Roboto",
  fontWeight: "500",
  color: "#333",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4rem",
  },
};
theme.typography.h3 = {
  fontFamily: "Roboto",
  fontWeight: "600",
  color: "#555",
  fontSize: "1.5rem",
};
theme.typography.h4 = {
  fontFamily: "Roboto",
  fontWeight: "600",
  fontSize: "2rem",
  letterSpacing: "1.3px",
  wordSpacing: "0px",
};
theme.typography.h5 = {
  fontFamily: "Roboto",
  fontWeight: "500",
  fontSize: "1.1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
};
theme.typography.h6 = {
  fontFamily: "Roboto",
  fontWeight: "600",
};
theme.typography.subtitle1 = {
  fontFamily: "Roboto",
  fontWeight: "400",
  color: GreyColor,
  fontSize: ".95rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: ".9rem",
  },
};
theme.typography.subtitle2 = {
  fontFamily: "Roboto",
  fontWeight: "500",
  color: GreyColor,
  fontSize: ".75rem",
  // letterSpacing: "1.5px",
  // wordSpacing: ".3px",
};
theme.typography.body2 = {
  fontWeight: "400",
  color: "#777",
  fontSize: ".9rem",
};

export default theme;
