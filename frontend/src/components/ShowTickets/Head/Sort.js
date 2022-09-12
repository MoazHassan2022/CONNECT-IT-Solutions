import { IconButton, TableCell , useTheme } from "@mui/material";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { RiArrowUpDownFill } from "react-icons/ri";


const Sort = ({orderBy, setOrderBy , order , setOrder , title , seto}) => {
    const theme = useTheme();


    const symbol = () => {
        if(orderBy != title){
            return <RiArrowUpDownFill />;
        }else {
            if(order == 'asc') return <AiOutlineArrowUp />;
            else return <AiOutlineArrowDown />;
        }
    }

    const HandleOrderClick = () => {
        if(orderBy != title) {
            setOrderBy(title);
            setOrder('asc');
            seto('asc');
        }else if(order === 'asc') {
            setOrder('des');
            seto('des');
        }else{
            setOrder('asc');
            seto('asc');
        }
    }


    return (
    <TableCell align='left' sx={{color: theme.palette.secondary.main , fontWeight: 700}}>
        <IconButton onClick={HandleOrderClick}>
            {symbol()}
        </IconButton>
        {title}
    </TableCell>
    );
}

export default Sort;
