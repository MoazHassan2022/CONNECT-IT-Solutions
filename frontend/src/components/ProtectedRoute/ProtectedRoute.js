import { Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Utalites/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log(user);
    // user is not authenticated
    return <Typography>khfdhfjdhjfh</Typography>;
};

