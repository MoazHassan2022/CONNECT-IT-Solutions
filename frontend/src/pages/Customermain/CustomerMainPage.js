import axios from "axios";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreateTicket from "../../components/CreateTicket/CreateTicket";
import ShowTickets from "../../components/ShowTickets/showTickets";
import theme from "../../Utalites/Theme";
import { Avatar, Button, Drawer, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { Stack } from "@mui/material";
import { Alert,  Snackbar } from "@mui/material";
import {MdOutlineCancel , MdOutlineCheckCircle} from "react-icons/md"
import {baseurl} from "../../Utalites/utalities"



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

  
 function MainPage() {

  const history = useNavigate();
  const [cookies, setCookie ,  removeCookie] = useCookies(['user']);
  const [imgnew , seimgnew]  = React.useState();
  const [img , setImg]  = React.useState();
  const [wantUpdate, setWantUpdate ]= React.useState(false);
  const [uploadPhotoError, setuploadPhotoError] = React.useState(false);


  const [value, setValue] = React.useState(1);

  React.useEffect(() => {
    if(cookies.userType == undefined){
      history("/login");
    }
    const auth = "Bearer " + cookies.token;
    setImg(baseurl+`/api/public/img/users/${cookies.photo}`);
    },[])

    // 1 => customer , 2 => Admin
    const usertype = cookies.userType;

    let tabs;
      
    if (usertype == 1) {
        tabs = ["submit ticket" , "Manage Your Tickets" , "Solved Tickets"];
    }else{
        tabs = ["Pending Tickets" , "Manage Your Tickets" , "Solved Tickets",  ];
    }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logout = async () =>{
    removeCookie("token");
    history("/login");
  }

  const UpdateImg = async () =>{
    //update img here
    if(imgnew.target.files[0] != undefined){
    let formData = new FormData();
    formData.append("photo", imgnew.target.files[0]);
    const auth = "Bearer " + cookies.token;
    await axios.patch(baseurl + "/api/users/updateMe",formData,{headers:{
      authorization: auth, 
    }}).then(res =>{
      setCookie("photo",res.data.data.user.photo);
    });
    window.location.reload();
  }else{
    setuploadPhotoError(true);
  }

  }

  


   const DeleteMe = async () => {
    const auth = "Bearer " + cookies.token;

    await axios.delete(baseurl + "/api/users/deleteMe",{headers:{
      authorization: auth, 
    }}).then(res => {});
     

    logout();
  }


  const [anchorEl, setAnchorEl] = React.useState(null);


  return (
      <Box
        sx={{ flexGrow: 1, display: 'flex', height: '105vh', }}
      >
        <Drawer        
        variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "27.94vh", bgcolor: theme.palette.primary.main },
          }}
          open
          >






    <Button  component="label" onClick={(e) => { setAnchorEl(e.currentTarget); } }>
      <Box  sx={{ alignSelf: 'center', marginTop: '2vh', marginBottom: '2vh', }} >
        <Avatar  
        src={img}
        alt={cookies.name} 
          sx={{ width: 120, height: 120, bgcolor: theme.palette.secondary.main ,fontSize:50 , }}
          />
      </Box>
    </Button>
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={() => { setAnchorEl(null); }}
        >
          <MenuItem component="label" onClick={(e) => {setAnchorEl(null);  seimgnew(e); setWantUpdate(true);}}>
              Update Image
              <input hidden accept="image/*" multiple type="file" />
          </MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
          <MenuItem onClick={DeleteMe}>Delete Account</MenuItem>

      </Menu>

      {
        wantUpdate && 
        <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={2} >
          <Button sx={{ bgcolor: theme.palette.secondary.main,}} endIcon={<MdOutlineCheckCircle color={theme.palette.primary.main} />} variant="contained"  onClick={UpdateImg}>
            <Typography variant="contained" color={theme.palette.primary.main} >
            Update
            </Typography>
          </Button>
          <Button sx={{ bgcolor: theme.palette.secondary.main, }} endIcon={<MdOutlineCancel color={theme.palette.primary.main} />}  variant="contained" onClick={() => setWantUpdate(false) } >
            <Typography variant="contained" color={theme.palette.primary.main} >
              Cancel
            </Typography>
          </Button>
        </Stack>
      }

          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleChange}
            sx={{  borderRight: 2, borderColor: theme.palette.secondary.main ,  bgcolor: theme.palette.primary.main , width:'27.9vh', display: 'flex',  flexDirection: "column", alignItems: "flex-end",
                  height: '100vh', 
            }}
          >

          {tabs.map(((t, index) =>{
              return (
                  <Tab key={index} label={t} {...a11yProps(tabs.indexOf(t))} />
              );
          })) }

          <Box  sx={{ alignSelf: 'center', marginTop: '8vh', }} >
            <Avatar variant="rounded"  sx={{ width: 160, height: 55, transform:"scale(1.2)" }} src="/Assets/CONNECT.svg" alt="CO" />
          </Box>

        </Tabs>
        </Drawer>


          { usertype == 2 && <>
              <TabPanel value={value} index={0}>
              <ShowTickets api={baseurl + "/api/tickets?status=1"} tabNumber={0} />
              </TabPanel>

              <TabPanel value={value} index={1} >
              <ShowTickets api={baseurl + "/api/users/myTickets?sort=createdAt"} tabNumber={1}  />
              </TabPanel>

              <TabPanel value={value} index={2} >
              <ShowTickets api={baseurl + "/api/tickets?sort=createdAt"} tabNumber={2}  />      
              </TabPanel>

                </>
          }

          { usertype == 1 && <>
              <TabPanel value={value} index={0} >
              <CreateTicket /> 
              </TabPanel>

              <TabPanel value={value} index={1} >
              <ShowTickets api={baseurl + "/api/users/myTickets?sort=createdAt"} tabNumber={1}  />      
              </TabPanel>

              <TabPanel value={value} index={2} >
              <ShowTickets api={baseurl + "/api/tickets?sort=createdAt"} tabNumber={2}  />      
              </TabPanel>
                  </>
          }
          

          <Snackbar sx={{ width:400, }} open={uploadPhotoError} autoHideDuration={6000} onClose={() => setuploadPhotoError(false) }>
            <Alert onClose={() => setuploadPhotoError(false)} severity="error" >
                Please attach a vaild image!!
            </Alert >
        </Snackbar>
      </Box>
  );
}
export default MainPage;

