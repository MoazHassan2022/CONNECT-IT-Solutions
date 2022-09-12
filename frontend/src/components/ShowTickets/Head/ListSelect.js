import { MenuItem, Select, TableCell } from "@mui/material";


const ListSelect = ({val , setval, options}) => {

    return <TableCell>
            <Select
                value={val}
                onChange={(e) => setval(e.target.value)}
              >
                {options.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
              </Select>
    </TableCell>
}

export default ListSelect;
