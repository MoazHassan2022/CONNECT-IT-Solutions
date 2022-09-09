import { Autocomplete, TableCell, TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import axios from "axios";
import { useState } from "react";
import { useCookies } from 'react-cookie';


export const AutoCompleteChoseMe = ({setAttID, apiFeatchFrom}) => {
    const theme = useTheme();
    const [choses , setChoses] = useState([]);
    const [cookies] = useCookies(['user']);


    const fetchelements = async (text) => {
        const auth = "Bearer " + cookies.token;
         const res = await axios.get(`${apiFeatchFrom}${text}`, {headers:{
          authorization: auth, 
        }});  
        return [res.data.results, res.data.data.projects];
      }

    return (
    <TableCell>
        <Autocomplete
      disablePortal
      required
      onChange={(event, newValue) => {
        setAttID(newValue._id);
      }}
      options={choses}
      getOptionLabel={(option) => option.name}
      onInputChange={(event, newValue) => {
      // make request with each change
      fetchelements(newValue).then((res) => {
        if(res[0] > 0){
          setChoses(res[1]);
        }else {
          setChoses([]);
        }
      });
    }}
      sx={{ width: 300, marginLeft:6 }}
      renderInput={(params) => <TextField {...params} label="Search For Project" />  }
      />
    </TableCell>
    );
};

export default AutoCompleteChoseMe;