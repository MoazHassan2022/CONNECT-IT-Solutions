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
import { Avatar, Button, InputBase, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { MdAssignmentInd , MdPendingActions, MdVerifiedUser , MdOutlineFingerprint} from "react-icons/md";
import { SiVerizon } from "react-icons/si";
import {FcHighPriority , FcMediumPriority , FcLowPriority} from "react-icons/fc";
import { blue, brown, green, purple } from '@mui/material/colors';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import ShowAttachments from './showAttachments';
import {FaSearch} from "react-icons/fa"
import styled from '@emotion/styled';
import { alpha } from '@mui/material/styles';
import JustText from './Head/JustText';
import AutoCompleteChoseMe from './Head/AutoCompleteChoseMe';
import Sort from './Head/Sort';
import ListSelect from './Head/ListSelect';
import AutoPreview from './Head/AutoPreview';


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


function createData(TicketID, Title, Description, Priority, status, Projectname , ProjectId , Category, Date,  Comments , clientID , clinetName , clientPhoto , adminID , adminName , adminPhoto, attachments , Answer  ) {
  return {TicketID, Title, Description, Priority, status, Projectname , ProjectId , Category, Date,  Comments , clientID , clinetName , clientPhoto , adminID , adminName , adminPhoto, attachments , Answer };
}



function Row(props) {
  const theme = useTheme();

  const [cookies] = useCookies(['user']);
  const usertype = cookies.userType;
  const [ row, setRow ] = React.useState(props.row);

  
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");



  const createComment = async (e) => {
    e.preventDefault();

    if (value.length > 0) {
        let dataToSend = {
          "comment": {"content": value},
        };
        const auth = "Bearer " + cookies.token;
        await axios.patch(`http://127.0.0.1:3000/api/tickets/${row.TicketID}`, dataToSend, {headers:{
          authorization: auth, 
        }}).then(res => {
          setRow( prepareRow(res.data.data.ticket) );
        }).catch(err => console.log(err));
        setValue("");
    }
  };


  const renderstatus = (stat) => {
    switch(stat) {
    case 1: return <MdPendingActions color="#839413" fontSize={20} title="Pending"  />;
    case 2: return <MdAssignmentInd color="#001357" fontSize={20} title="Assigned" />; 
    case 3: return <SiVerizon color="#16591d" fontSize={20} title="Solved" />; 
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
    case "Service": return <Typography variant="h5" sx={{bgcolor: blue[700] , color: "#fff" , borderRadius:3 , width: "auto",}} align="center" >Service</Typography>;
    case "System": return <Typography variant="h5" sx={{bgcolor: brown[700] , color: "#fff" , borderRadius:3 , width: "auto",}} align="center" >System</Typography>; 
    case "Network": return <Typography variant="h5"  sx={{bgcolor: purple[700] , color: "#fff" , borderRadius:3 , width: "auto",}} align="center" >Network</Typography>;
    case "Telecommunications":  return <Typography variant="h5"  sx={{bgcolor: "#663102" , color: "#fff" , borderRadius:3 , width: "auto",}} align="center" >Telecommunications</Typography>; 
  }
  }


  const AssignTicket = async () => {
    const auth = "Bearer " + cookies.token;
    await axios.patch(`http://127.0.0.1:3000/api/tickets/${row.TicketID}`,
      {admin: "admin"}, {headers:{
      authorization: auth, 
    }}).then(res => { setRow( prepareRow(res.data.data.ticket)); console.log(res); } ).catch(err => console.log(err));

  }


  const CloseTicket = async () => {
    const auth = "Bearer " + cookies.token;
    await axios.patch(`http://127.0.0.1:3000/api/tickets/${row.TicketID}` , { 
      status: 3,
    }, {headers:{
      authorization: auth, 
    }}).then( res => { setRow( prepareRow(res.data.data.ticket)); console.log(res.data.data.ticket); }  ).catch(err => console.log(err));
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
        await axios.patch(`http://127.0.0.1:3000/api/tickets/${row.TicketID}`, dataToSend, {headers:{
          authorization: auth, 
        }}).then(res => {
          setRow( prepareRow(res.data.data.ticket) );
          console.log(res.data.data.ticket);
        }).catch(err => console.log(err));
        setValue("");
    }
  };



  const renderSolved = () => {
    if(cookies.userType == 1){
      return (
        <IconButton onClick={CloseTicket} title="Close Ticket" >
                    <BsFillCheckCircleFill color={green[800]} size={25} />
        </IconButton>
      )
    }else {
      return(
      <IconButton onClick={ConsiderComment} title="Consider This As Answer" >
                    <BsFillCheckCircleFill color={green[800]} size={25} />
      </IconButton>
      )
    }

  }


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } , marginTop: "-5px" }} >
        <TableCell width={5}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell width={150} sx={{maxWidth: 50, overflow:"hidden"}}>{row.Title}</TableCell>
        <TableCell width={150} >{row.clinetName}</TableCell>
        <TableCell width={150}>{row.adminID != "-1" ? row.adminName : "NOt YET"}</TableCell>
        <TableCell width={10} >{renderPeriority(row.Priority)}</TableCell>
        <TableCell width={10}>{ renderstatus(row.status) }</TableCell>
        <TableCell width={150}>{row.Projectname}</TableCell>
        <TableCell width={150}>{renderCategory(row.Category)}</TableCell>
        <TableCell >{row.Date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Stack sx={{paddingBottom:2}} direction="column" >
              <Stack direction="row">
              <Typography variant="h3" sx={{display: "block", color: theme.palette.primary.main , paddingright:10}}> Description </Typography>
              {usertype == 2  && row.status == 1 && 
                      <IconButton aria-label="fingerprint" title="Assign TO my" color="primary" onClick={AssignTicket} >
                      <MdOutlineFingerprint />
                      </IconButton>
              }
              </Stack>
              <Stack  direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
              >
              <Typography variant="body1" width="100%">
                {row.Description}
              </Typography>
              <Box>
                {
                row.attachments.length > 0 &&             
                <ShowAttachments attachments={row.attachments} />
                } 
              </Box>

              </Stack>

              {row.status === 3 && 
             <ListItem alignItems="flex-start" >
              <ListItemAvatar>
                <Avatar alt={row.adminName} src={row.adminPhoto} />
              </ListItemAvatar>
              <ListItemText
                primary={`${row.adminName}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="subtitle2"
                      color="text.primary"
                    >
                    </Typography>
                    <Typography variant="body1" sx={{fontSize: 20 , fontWeight: "bold"}}>
                    {row.Answer}
                    </Typography>
                  </React.Fragment>
                }
              />
              <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} > <Typography sx={{color:green[400]}} alignSelf="center">Solved <MdVerifiedUser size={20} color={green[400]} /></Typography> </Stack>
            </ListItem>
            }
            </Stack>
            <Typography variant="h3"> Comments </Typography>
            <Box sx={{ margin: 1 }}>
            {row.Comments.map((comment, index) => { 
              let name = comment.name;
              let photo = comment.photo;
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
            <Avatar alt="Name" sx={{marginLeft:1.1}} />
          </ListItemAvatar>
          <ListItemText
            secondary={
              <form onSubmit={createComment} >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <TextField
                  label="Comment"
                  placeholder="give your Comment"
                  multiline
                  value={value}
                  sx={{ width: "90%"}}
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
        </ListItem>}
          </Collapse>
        </TableCell>
      </TableRow>
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
      const item = createData(_id , _title ,_description,_Priority,
        _status ,_Project , _ProjectId , _Category,_Date ,_comments 
        , _ClientID, _ClientName ,_Clientphoto ,_AdminID,_AdminName ,  _AdminPhoto , _Attachments , _Answer );
        return item;
}


const heads = [["Details", 0], ["Title" , 1], ["Client", 1], ["Admin", 1], ["Priority", 2],["Status", 2],["Project" , 1] , ["Category", 3], ["Date" , 2] ];


export default function Showtickets({api , tabNumber}) {
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

  const [orderBy, setOrderBy] = React.useState('Date');
  const [order, setOrder] = React.useState('asc');
  const [selectVal , setSelectVal] = React.useState('all');

  const HeadCells = (num) =>{

    if(num === 0) return <JustText text="Filter" index={Math.random() * 500} />; // Detail -> Text
    if(num === 1) return <AutoPreview setAttID={(seachedtitle) => {console.log(seachedtitle); Fetching(`http://127.0.0.1:3000/api/${tabNumber == 2 ? "tickets" : "users/myTickets"}?subject=${seachedtitle}`); }} />; // Title -> AutoPreview
    if(num === 2) return <JustText text="Client" index={Math.random() * 500} />; // Client -> Text
    if(num === 3) return <JustText text="Admin" index={Math.random() * 500}/>; // Admin -> Text
    if(num === 4) return <Sort orderBy={orderBy} setOrderBy={setOrderBy}  order={order} setOrder={setOrder}  title="Priority" seto={( _order) => Fetching(`http://127.0.0.1:3000/api/${tabNumber == 2 ? "tickets" : "users/myTickets"}?sort=${_order =='asc'? "" : "-"}priority`) } />;  // Priority -> sort
    if(num === 5) return <Sort orderBy={orderBy} setOrderBy={setOrderBy}  order={order} setOrder={setOrder}  title="Status" seto={( _order) => Fetching(`http://127.0.0.1:3000/api/${tabNumber == 2 ? "tickets" : "users/myTickets"}?sort=${_order =='asc'? "" : "-"}status`) }/>;  // Status  -> sort
    if(num === 6) return <AutoCompleteChoseMe setAttID={(newtext) => { console.log(newtext); }} apiFeatchFrom="http://127.0.0.1:3000/api/projects?name=" />;  // Project -> AutoComplete
    if(num === 7) return <ListSelect val={selectVal}  setval={ (newva) => { setSelectVal(newva); Fetching(`http://127.0.0.1:3000/api/${tabNumber == 2 ? "tickets" : "users/myTickets"}?category=${newva}`);} } options={ ["all" , "Network" , "System", "Service" , "Telecommunications"] } />; // Category -> list
    if(num === 8) return <Sort orderBy={orderBy} setOrderBy={setOrderBy}  order={order} setOrder={setOrder}  title="Date" seto={( _order) => Fetching(`http://127.0.0.1:3000/api/${tabNumber == 2 ? "tickets" : "users/myTickets"}?sort=${_order =='asc'? "" : "-"}createdAt`) }/>; // Date -> sort

  }

  return (
    <TableContainer component={Paper} sx={{marginTop:"-10px" , marginLeft:"28.5vh" , width:"166vh"}}>
      <Table  aria-label="custom pagination table">
      <TableHead sx={{ bgcolor: theme.palette.primary.main , color: theme.palette.secondary.main , maringTop:50 }} >
          <TableRow sx={{ marginBottom: "80px"}}>
          {[0 ,1,2,3,4,5,6,7,8].map((head, index) => {
              return (
                HeadCells(head)
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
              return( <Row key={index + page * rowsPerPage + Math.random() * 4826787} row={_row} />)
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
