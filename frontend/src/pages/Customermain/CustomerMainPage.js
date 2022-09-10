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
import { Avatar, Button, Drawer } from "@mui/material";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { Stack } from "@mui/system";
import { Alert,  Snackbar } from "@mui/material";



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
    setImg(`http://127.0.0.1:3000/img/users/${cookies.photo}`);
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
    await axios.patch("http://127.0.0.1:3000/api/users/updateMe",formData,{headers:{
      authorization: auth, 
    }}).then(res =>{
      setCookie("photo",res.data.data.user.photo);
    });
    window.location.reload();
  }else{
    setuploadPhotoError(true);
  }

  }

  


  const userPhoto = () => {
    if(wantUpdate) {return (
    <Stack direction="column">
    <Button aria-label="upload picture" component="label" onClick={(e) => { seimgnew(e); setWantUpdate(true);} }>
      <Box  sx={{ alignSelf: 'center', marginTop: '2vh', marginBottom: '2vh', /*borderRadius: "50%", boxShadow: "#F7C815 0px 0px 20px;",*/ }} >
        <Avatar  
        src={img}
        alt={cookies.name} 
          sx={{ width: 120, height: 120, bgcolor: theme.palette.secondary.main ,fontSize:50 , }}
          />
      </Box>
      <input hidden accept="image/*" multiple type="file" />
    </Button>
     <Button sx={{ bgcolor: theme.palette.secondary.main}} variant="contained" component="label" onClick={UpdateImg}>
              Update
    </Button>
  </Stack>)
  }
  else{ return(
  <Stack direction="column">
  <Button aria-label="upload picture" component="label" onClick={(e) => { seimgnew(e); setWantUpdate(true);} }>
    <Box  sx={{ alignSelf: 'center', marginTop: '2vh', marginBottom: '2vh', /*borderRadius: "50%", boxShadow: "#F7C815 0px 0px 20px;",*/ }} >
      <Avatar  
      src={img}
      alt={cookies.name} 
        sx={{ width: 120, height: 120, bgcolor: theme.palette.secondary.main ,fontSize:50 , }}
        />
    </Box>
    <input hidden accept="image/*" multiple type="file" />
  </Button>
</Stack>
)
}
  }

  return (
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '105vh' }}
      >
        <Stack direction="column"></Stack>
        <Drawer        
      
        variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "27.9vh", bgcolor: theme.palette.primary.main },
          }}
          open
          >
          {userPhoto()}
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

          <Box  sx={{ alignSelf: 'center', marginTop: '8vh' }} >
          <Typography variant="h2" color={theme.palette.secondary.main} >
            Safacotech
          </Typography>
          </Box>

          <Box  sx={{ alignSelf: 'center', marginTop: '8vh' }} >
            <Button sx={{ bgcolor: "#fff"}} onClick={logout}>
               logout
            </Button>
          </Box>
        </Tabs>
        </Drawer>


          { usertype == 2 && <>
              <TabPanel value={value} index={0}>
              <ShowTickets api={"http://127.0.0.1:3000/api/tickets?status=1"} tabNumber={2} />
              </TabPanel>

              <TabPanel value={value} index={1} >
              <ShowTickets api={"http://127.0.0.1:3000/api/users/myTickets?sort=createdAt"} tabNumber={1}  />
              </TabPanel>

              <TabPanel value={value} index={2} >
              <ShowTickets api={"http://127.0.0.1:3000/api/tickets?sort=createdAt"} tabNumber={2}  />      
              </TabPanel>

                </>
          }

          { usertype == 1 && <>
              <TabPanel value={value} index={0}>
              <CreateTicket /> 
              </TabPanel>

              <TabPanel value={value} index={1} >
              <ShowTickets api={"http://127.0.0.1:3000/api/users/myTickets?sort=createdAt"} tabNumber={1}  />      
              </TabPanel>

              <TabPanel value={value} index={2} >
              <ShowTickets api={"http://127.0.0.1:3000/api/tickets?sort=createdAt"} tabNumber={2}  />      
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

