import { TableCell, useTheme } from "@mui/material";


const JustText = ({text, index}) =>{
  const theme = useTheme();


    return (
        <TableCell align='left' key={index} sx={{color: theme.palette.secondary.main , fontWeight: 700}}>{text}</TableCell>
    )
}

export default JustText;
