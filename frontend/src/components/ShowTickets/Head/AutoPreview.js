import { Autocomplete, TableCell, TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';

const AutoPreview = ({ setAttID }) => {


    const theme = useTheme();

    return (
    <TableCell>
        <TextField id="outlined-search" label="Search field" type="search"  onChange={(e) => {setAttID(e.target.value);}} />
    </TableCell>
    );
}

export default AutoPreview;