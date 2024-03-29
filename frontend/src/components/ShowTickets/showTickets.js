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
import {BsFillArrowRightCircleFill , BsFillCheckCircleFill} from 'react-icons/bs';
import axios from 'axios';
import { Alert, Avatar, Button, ListItem, ListItemAvatar, ListItemText, Snackbar, TextField  , Stack } from '@mui/material';
import { MdAssignmentInd , MdPendingActions , MdOutlineFingerprint} from "react-icons/md";
import {FcHighPriority , FcMediumPriority , FcLowPriority} from "react-icons/fc";
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import ShowAttachments from './showAttachments';
import {FaFilter} from "react-icons/fa"
import Filter from './Filter';
import { baseurl } from '../../Utalites/utalities';


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


function createData(TicketID, Title, Description, Priority, status, Projectname , ProjectId , Category, Date,  Comments , clientID , clinetName , clientPhoto , adminID , adminName , adminPhoto, attachments , Answer , answeredAt  ) {
  return {TicketID, Title, Description, Priority, status, Projectname , ProjectId , Category, Date,  Comments , clientID , clinetName , clientPhoto , adminID , adminName , adminPhoto, attachments , Answer , answeredAt };
}



function Row({roww , snackbarShowMessage}) {
  const theme = useTheme(); 

  const [cookies] = useCookies(['user']);
  const usertype = cookies.userType;
  const [ row, setRow ] = React.useState(roww);

  
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [snakeData, setSnakeData] = React.useState([false,"",""]);



  const createComment = async (e) => {
    e.preventDefault();

    if (value.length > 0) {
        let dataToSend = {
          "comment": {"content": value},
        };
        const auth = "Bearer " + cookies.token;
        await axios.patch(`/api/tickets/${row.TicketID}`, dataToSend, {headers:{
          authorization: auth, 
        }}).then(res => {
          setRow( prepareRow(res.data.data.ticket) );
          setSnakeData([true, "Comment is successfully created!" , "success"]);
        }).catch(err => 
          setSnakeData([true, err.response.data.message , "error"])
          );
        setValue("");
    }
  };


  const renderstatus = (stat) => {
    switch(stat) {
    case 1: return <MdPendingActions color="#839413" fontSize={20} title="Pending"  />;
    case 2: return <MdAssignmentInd color="#001357" fontSize={20} title="Assigned" />; 
    case 3: return <BsFillCheckCircleFill color={theme.palette.secondary.main} fontSize={20} title="Solved" />; 
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
    case "Service": return <Typography variant="h5" sx={{bgcolor: theme.palette.secondary.main , color: "#fff" , borderRadius:3 , width: "auto",}} align="center" >Service</Typography>;
    case "System": return <Typography variant="h5" sx={{bgcolor: theme.palette.thrid.main , color: "#fff" , borderRadius:3 , width: "auto",}} align="center" >System</Typography>; 
    case "Network": return <Typography variant="h5"  sx={{bgcolor: theme.palette.forth.main , color: "#fff" , borderRadius:3 , width: "auto",}} align="center" >Network</Typography>;
    case "Telecommunications":  return <Typography variant="h5"  sx={{bgcolor: theme.palette.fivth.main , color: "#fff" , borderRadius:3 , width: 160,}} align="center" >Telecommunications</Typography>; 
  }
  }


  const AssignTicket = async () => {
    const auth = "Bearer " + cookies.token;
    await axios.patch(`/api/tickets/${row.TicketID}`,
      {admin: "admin"}, {headers:{
      authorization: auth, 
    }}).then(res => { 
      setRow( prepareRow(res.data.data.ticket));
       setSnakeData([true, "Ticket is assigned to you" , "info"])
      } ).catch(err => setSnakeData([true, err.response.data.message , "error"])  );
  }


  const CloseTicket = async () => {
    const auth = "Bearer " + cookies.token;
    await axios.patch(`/api/tickets/${row.TicketID}` , { 
      status: 3,
    }, {headers:{
      authorization: auth, 
    }}).then( res => { 
      setRow( prepareRow(res.data.data.ticket));
      setSnakeData([true, "Ticket is closed successfully!" , "success"])
       }  ).catch(err => setSnakeData([true, err.response.data.message , "error"]) );
  }


  const ConsiderComment = async (e) => {
    e.preventDefault();
    if (value.length > 0) {
        let dataToSend = {
          "comment": {
            "content": value, 
            "isAnswer": true
        },
        };
        const auth = "Bearer " + cookies.token;
        await axios.patch(`/api/tickets/${row.TicketID}`, dataToSend, {headers:{
          authorization: auth, 
        }}).then(res => {
          setRow( prepareRow(res.data.data.ticket) );
          setSnakeData([true, "Asnwer is submitted successfully!" , "success"]);
        }).catch(err => setSnakeData([true, err.response.data.message , "error"]) );
        setValue("");
    }
  };




  const renderSolved = () => {
    if(cookies.userType == 1){
      return (
        <IconButton onClick={CloseTicket} title="Close Ticket" >
                    <BsFillCheckCircleFill color={theme.palette.secondary.main} size={25} />
        </IconButton>
      )
    }else {
      return(
      <IconButton onClick={ConsiderComment} title="Consider This As Answer" >
                    <BsFillCheckCircleFill color={theme.palette.secondary.main} size={25} />
      </IconButton>
      )
    }

  }

  return (
    <React.Fragment>
      <TableRow key={1} sx={{ '& > *': { borderBottom: '20px' } , marginTop: "-5px" }} >
        <TableCell width={5}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell width={150} sx={{maxWidth: 200, overflow:"hidden"}}>{row.Title}</TableCell>
        <TableCell width={150} >{row.clinetName}</TableCell>
        <TableCell width={150}>{row.adminID != "-1" ? row.adminName : "NOt YET"}</TableCell>
        <TableCell width={10} >{renderPeriority(row.Priority)}</TableCell>
        <TableCell width={10}>{ renderstatus(row.status) }</TableCell>
        <TableCell width={150}>{row.Projectname}</TableCell>
        <TableCell width={160}>{renderCategory(row.Category)}</TableCell>
        <TableCell >{row.Date}</TableCell>
      
      </TableRow>

      <TableRow key={2}  >
      <TableCell width={5000} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Box sx={{ margin: 1, }}>
              <Stack sx={{paddingBottom:2}} direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={2}
              >
                <Stack direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={4}
                   >
                    
                  <Stack width="70%" direction="column" spacing={5}>
                    <Stack direction="row">
                      <Stack direction="column" >
                        <Stack direction="row">
                        <Typography variant="h3" sx={{display: "block", color: theme.palette.primary.main , paddingright:10}}> Description </Typography>
                        {usertype == 2  && row.status == 1 && 
                              <IconButton aria-label="fingerprint" title="Assign TO my" color="primary" onClick={AssignTicket} >
                              <MdOutlineFingerprint />
                              </IconButton>
                      }
                        </Stack>
                        <Typography variant="body1" width="100%">
                        {row.Description}
                        </Typography>
                      </Stack>
                    </Stack>

                    {row.status === 3 && row.Answer != undefined &&
                        <ListItem alignItems="flex-start" sx={{marginRight:500}} >
                          <ListItemAvatar>
                            <Avatar alt={row.adminName} src={`/api/public/img/users/${row.adminPhoto}`} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Stack direction="row" >
                                <Typography > {row.adminName} 
                                </Typography>
                                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1} >
                             <Typography sx={{color:theme.palette.secondary.main, marginLeft: 4 }} alignSelf="center">
                              Solved 
                              </Typography>
                              <BsFillCheckCircleFill size={20} color={theme.palette.secondary.main} />
                          </Stack>
                            
                              </Stack>
                            }
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="subtitle2"
                                  color="text.primary"
                                >
                                  {row.answeredAt}
                                </Typography>
                                <Typography variant="body1" sx={{fontSize: 20 , fontWeight: "bold"}}>
                                {row.Answer}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                          
                        </ListItem>
                    }
                  </Stack>

                  <Box>                  
                    {
                    row.attachments.length > 0 &&             
                    <ShowAttachments attachments={row.attachments} />
                    } 
                  </Box>
                </Stack>

                
              </Stack>
              
              <Typography variant="h3"> Comments </Typography>
              <Box sx={{ margin: 1 }}>
              {row.Comments.map((comment, index) => { 
                let name = comment.name;
                let photo = baseurl+`/api/public/img/users/${comment.photo}`;
                let Date = row.Date;
                let content = comment.content;
                return (
                <ListItem alignItems="flex-start" key={index}>
                <ListItemAvatar>
                  <Avatar alt={name} src={photo} />
                </ListItemAvatar>
                <ListItemText
                  primary={name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="subtitle2"
                        color="text.primary"
                      >
                        {Date}
                      </Typography>
                      <Typography variant="h5" sx={{display: "block"}}>
                      {content}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
                )
              })}
              
              </Box>
              {row.status !== 3 && <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar size="large" src={`/api/public/img/users/${cookies.photo}`} alt="Name" sx={{marginLeft:1.1, marginRight:1.2 , width:50 , height:50 }} />
            </ListItemAvatar>
            <ListItemText
              secondary={
                <form onSubmit={createComment} >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  <TextField
                    label="Comment"
                    placeholder="give your Comment"
                    multiline
                    value={value}
                    sx={{ width: "60%"}}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                  >
                    <Button
                      type="submit"
                      variant="text"
                      centerRipple
                      size="small"
                      title="Submit Comment"
                      disabled={value.length === 0}
                      startIcon={<BsFillArrowRightCircleFill size={25} />}
                    />
                    {renderSolved()}
                  </Stack>
                </Stack>
                </form>
              }
            />
          </ListItem>
          }
          </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Snackbar sx={{ width:400, }} open={snakeData[0]} autoHideDuration={3000} onClose={() => setSnakeData([false , "" , ""]) }>
            <Alert onClose={() => setSnakeData([false , "" , ""])} severity={snakeData[2]} >
                {snakeData[1]}
            </Alert >
        </Snackbar>
    </React.Fragment>
  );
}


const prepareRow = (tic) =>{

  let _id = tic._id;
      let _title = tic.subject;
      let _description = tic.description;
      let _Priority = tic.priority;
      let _status = tic.status;
      let _Project = tic.project.name;
      let _ProjectId = tic.project._id;
      let _Category = tic.category;
      let _Date = tic.createdAt;
      let _comments = tic.comments;
      let _ClientID = tic.client._id;
      let _ClientName = tic.client.name;
      let _Clientphoto = tic.client.photo;
      let _AdminID = "-1";
      let _AdminName = "";
      let _AdminPhoto = "";
      if(tic.admin){
       _AdminID = tic.admin._id;
       _AdminName = tic.admin.name;
       _AdminPhoto = tic.admin.photo;
    }
      let _Attachments = tic.attachments;
      let _Answer = tic.answer;
      let _AnsweredAt = tic.answeredAt;
      const item = createData(_id , _title ,_description,_Priority,
        _status ,_Project , _ProjectId , _Category,_Date ,_comments 
        , _ClientID, _ClientName ,_Clientphoto ,_AdminID,_AdminName ,  _AdminPhoto , _Attachments , _Answer , _AnsweredAt );
        return item;
}


const heads = [ "Title" , "Client", "Admin","Priority", "Status", "Project" ,"Category" ,"Date" ];


export function Showtickets({api , tabNumber, snackbarShowMessage}) {
  const history = useNavigate();
  const theme = useTheme();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [cookies, setCookie] = useCookies(['user']);

  const [rows, setrows] = React.useState([]);

  const Fetching = async (fetapi) => {
    var Tickets;
    const auth = "Bearer " + cookies.token;
    const resp = await axios.get(fetapi , 
      {headers:{
        authorization: auth,
      }}
      ).then(response =>{
        Tickets = response.data.data.tickets;
      }).catch((error) => {
          history("/login", { replace: true });
        });
    var _data = [];
    Tickets.map((tic) => {
      const item = prepareRow(tic);
      _data.push(item);
    });
    setrows(_data);
  };


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {setPage(newPage);};

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => { Fetching(api); }, []);

  const [openFilter , setOpenFilter] = React.useState(false);

  const handleClickOpen = () => {
    setOpenFilter(true);
  };

  const handleClose = () => {
    setOpenFilter(false);
  };

  return (
    <TableContainer component={Paper} sx={{marginTop:"-10px" , marginLeft:"28.5vh" , width:"166vh" }}>
      <Table  aria-label="custom pagination table">
      <TableHead sx={{ bgcolor: theme.palette.primary.main , color: theme.palette.secondary.main , maringTop:50 }} >
          <TableRow sx={{ marginBottom: "80px"}}>
          <TableCell align='left' sx={{color: theme.palette.secondary.main , fontWeight: 700}}>
              <IconButton onClick={handleClickOpen}>
                  <FaFilter color={theme.palette.secondary.main} />
              </IconButton>
              <Filter open={openFilter} handleClose={handleClose} fetch={Fetching} tabnumber={tabNumber} baseapi={`/api/${tabNumber != 1 ? "tickets" : "users/myTickets"}`} />
        </TableCell>
          {heads.map((head, index) => {
              return (
                <TableCell align='left' key={index} sx={{color: theme.palette.secondary.main , fontWeight: 700}} >{head}</TableCell>
            );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {
          
          (rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((_row,index) => {
              return( <Row key={index + page * rowsPerPage + Math.random() * 4826787} roww={_row} snackbarShowMessage={snackbarShowMessage} />)
            }
          )}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter sx={{ height: 5 ,}} width={500}>
          <TableRow width={500}>
            <TablePagination
            width={500}
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
export default Showtickets;