import styled from "@emotion/styled";
import { alpha, Autocomplete, InputBase, TableCell, TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { FaSearch } from "react-icons/fa";

const AutoPreview = ({ setAttID }) => {
    const theme = useTheme();
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, .5),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 0, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(1)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: 40,
            '&:focus': {
              width: 80,
            },
          },
        },
      }));
      
    return (
    <TableCell align='left' sx={{color: theme.palette.secondary.main , fontWeight: 700,}} >
        <Search>
            <SearchIconWrapper>
              <FaSearch />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Title"
              onChange={(e) => {setAttID(e.target.value) }}
            />
    </Search>

    </TableCell>
    );
}

export default AutoPreview;

/*
        <TextField id="outlined-search" label="Search field" type="search"   />


*/ 