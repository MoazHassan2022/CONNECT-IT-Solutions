import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Collapse from '@mui/material/Collapse';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import {MdKeyboardArrowDown,  MdKeyboardArrowUp} from 'react-icons/md';
import {BsFillArrowRightCircleFill} from 'react-icons/bs';
import axios from 'axios';
import { Avatar, Button, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import theme from "../../Utalites/Theme";
import { MdAssignmentInd , MdPendingActions, MdVerifiedUser} from "react-icons/md";
import { SiVerizon } from "react-icons/si";
import {FcHighPriority , FcMediumPriority , FcLowPriority} from "react-icons/fc";
import { blue, brown, green, purple } from '@mui/material/colors';


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


function createData(Title, Description, Priority, status, Project , Category, Comments , Date) {
  return {Title, Description, Priority, status, Project , Category, Comments , Date };
}


const heads = [ "Comments" , "Title", "Priority", "status", "Project" , "Category" , "Date"];

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");


  const createReview = async () => {
    if (value.length > 0) {
      try {
        const date = new Date().toISOString();
        let dataToSend = {
          content: value,
          created_time: (0, date.slice(0, date.indexOf("T"))),
        };
        await axios.post("", dataToSend);
        setValue("");
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const renderstatus = (stat) => {
    switch(stat) {
    case 1: return <MdPendingActions color="#839413" fontSize={20}  />;
    case 2: return <MdAssignmentInd color="#001357" fontSize={20}  />; 
    case 3: return <SiVerizon color="#16591d" fontSize={20} />; 
  }
  }
  const renderPeriority = (stat) => {
    switch(stat) {
    case 1: return <FcLowPriority title="Ordinary"  fontSize={20}  />;
    case 2: return <FcMediumPriority title="Important"  fontSize={20}  />; 
    case 3: return <FcHighPriority title="Critical" fontSize={20} />; 
  }
  }

  const renderCategory = (stat) => {
    switch(stat) {
    case "serve": return <Typography variant="h5" sx={{bgcolor: blue[700] , color: "#fff" , borderRadius:3 , width: "auto",}} align="center" >Server</Typography>;
    case "System": return <Typography variant="h5" sx={{bgcolor: brown[700] , color: "#fff" , borderRadius:3 , width: "auto",}} align="center" >System</Typography>; 
    case "NetworK": return <Typography variant="h5"  sx={{bgcolor: purple[700] , color: "#fff" , borderRadius:3 , width: "auto",}} align="center" >NetworK</Typography>;
    case "telecomunications":  return <Typography variant="h5"  sx={{bgcolor: "#663102" , color: "#fff" , borderRadius:3 , width: "auto",}} align="center" >telecomunications</Typography>; 
  }
  }
  
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } , marginTop: "-5px" }} >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </IconButton>
        </TableCell>
        
        <TableCell component="th" scope="row">
          {row.Title}
        </TableCell>
        <TableCell >{renderPeriority(row.Priority)}</TableCell>
        <TableCell >
        { renderstatus(row.status) }
        </TableCell>
        <TableCell >{row.Project}</TableCell>
        <TableCell >{renderCategory(row.Category)}</TableCell>
        <TableCell >{row.Date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{paddingBottom:2}}>
              <Typography variant="h3"> Description </Typography>
              <Typography variant="body1" width="100%">
                {row.Description}
              </Typography>
            </Box>
            <Typography variant="h3"> Comments </Typography>
            <Box sx={{ margin: 1 }}>
            {row.Comments.map((comment, index) => { 
              let fname = "mahmoud";
              let lname = "mahmoud";
              let Date = row.Date;
              let content = comment.content;
              return (
              <ListItem alignItems="flex-start" key={index}>
              <ListItemAvatar>
                <Avatar alt={fname}  />
              </ListItemAvatar>
              <ListItemText
                primary={`${fname} ${lname}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="subtitle2"
                      color="text.primary"
                    >
                    </Typography>
                    {content}
                  </React.Fragment>
                }
              />
                {(row.Comments.length === index + 1 && row.status === 3 ) && <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} > <Typography sx={{color:green[400]}} alignSelf="center">Solved <MdVerifiedUser size={20} color={green[400]} /></Typography> </Stack>}
            </ListItem>
              )
             })}
            </Box>
            {row.status !== 3 && <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Name" sx={{marginLeft:1.1}} />
          </ListItemAvatar>
          <ListItemText
            secondary={
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <TextField
                  label="Review"
                  placeholder="give your Review"
                  multiline
                  value={value}
                  sx={{ width: "90%"}}
                  onChange={(e) => setValue(e.target.value)}
                />
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0}
                >
                  <Button
                    onClick={createReview}
                    variant="text"
                    centerRipple
                    size="small"
                    disabled={value.length === 0}
                    startIcon={<BsFillArrowRightCircleFill />}
                  />
                </Stack>
              </Stack>
            }
          />
        </ListItem>}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}



export default function Showtickets({api}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setrows] = React.useState([]);

  const renderDate = () => {
    const dat = new Date();
    const day= dat.getFullYear() +
    "-" +
    (dat.getMonth() + 1) +
    "-" +
    dat.getDate() + "\n" + dat.toLocaleTimeString('en-US');
    return day;
  }
  const fetching = async () => {
    const resp = await axios.get(api);
    const tickets = resp.data.data.tickets;
    var _data = [];
    tickets.map((tic) => {
      let _title = tic.subject;
      let _description = "shdjshdjshdjshajdhsjhdlksahljduifhndjfhnfkdof  jd kjl  fjewkjfkje eflkelfpuewjfaslf;al[f]peworpi457iw jehrjhkeyorwe8767r6e8wukjsdsamndbvhrui  uiueyoufhjdnf;spoeugiprfgkd yofuyruyiodsjvdmskvbojrug hefhldsasl'kfoeus";
      let _Priority = randomIntFromInterval(1,3);
      let _status = randomIntFromInterval(1,3);
      let _Project = tic.projectName;
      let _Category = "serve";
      let _Date = renderDate(new Date());
      let _comments = tic.comments;
      const item = createData(_title ,_description,_Priority,_status ,_Project , _Category,_comments , _Date);
      _data.push(item);_data.push(item);_data.push(item);_data.push(item);_data.push(item);
    });
    setrows(_data);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {setPage(newPage);};

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {fetching();}, []);

  return (
    <TableContainer component={Paper} sx={{marginTop:"-10px" , marginLeft:"28.5vh" , width:"166vh"}}>
      <Table  aria-label="custom pagination table">
      <TableHead sx={{ bgcolor: theme.palette.primary.main , color: theme.palette.secondary.main , maringTop:50 }} >
          <TableRow sx={{ marginBottom: "80px"}}>
          {heads.map((head, index) => {
              return (
            <TableCell key={index} sx={{color: theme.palette.secondary.main , fontWeight: 700}} >{head}</TableCell>
            );
            })}
            
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row,index) => (
              <Row key={index} row={row} />
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter sx={{ height: 5 ,}} >
          <TableRow >
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
