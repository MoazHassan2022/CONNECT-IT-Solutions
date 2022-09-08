import axios from "axios";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreateTicket from "../../components/CreateTicket/CreateTicket";
import ShowTickets from "../../components/ShowTickets/showTickets";
import AdminProfile from "../AdminPage/showTickets";
import theme from "../../Utalites/Theme";
import { Avatar, Button, Drawer } from "@mui/material";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";



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
  const [cookies, removeCookie] = useCookies(['user']);


  const [value, setValue] = React.useState(2);
    // 1 => customer , 2 => Admin
    const usertype = cookies.userType;
    let tabs;
      
    if (usertype === 1) {
        tabs = ["submit ticket" , "Manage Your Tickets" , "Solved Tickets"];
    }else{
        tabs = ["profile" , "Manage Your Tickets" , "Solved Tickets", "Pending Tickets" ];
    }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logout = async () =>{
    removeCookie("token");
    history("/login");
  }

  return (
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '105vh' }}
      >
        <Drawer            variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "27.9vh" },
          }}
          open
          >
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
          <Button>
          <Box  sx={{ alignSelf: 'center', marginTop: '2vh', marginBottom: '2vh', /*borderRadius: "50%", boxShadow: "#F7C815 0px 0px 20px;",*/ }} >
            <Avatar  alt="Waer" 
            src="./"
              sx={{ width: 120, height: 120, bgcolor: theme.palette.secondary.main ,fontSize:50 , }}
              />
            </Box>
          </Button>


          {tabs.map(((t, index) =>{
              return (
                  <Tab key={index} label={t} {...a11yProps(tabs.indexOf(t) +1)} />
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
              <TabPanel value={value} index={1}>
              <AdminProfile /> 
              </TabPanel>

              <TabPanel value={value} index={2} >
              <ShowTickets api={"http://127.0.0.1:3000/api/users/myTickets"} userType={2} />
              </TabPanel>

              <TabPanel value={value} index={3} >
              <ShowTickets api={"http://127.0.0.1:3000/api/tickets"} userType={2}/>      
              </TabPanel>

              <TabPanel value={value} index={4} >
              <ShowTickets api={"http://127.0.0.1:3000/api/tickets"} userType={2}/>      
              </TabPanel>
                  </>
          }

          { usertype == 1 && <>
              <TabPanel value={value} index={1}>
              <CreateTicket /> 
              </TabPanel>

              <TabPanel value={value} index={2}>
              <ShowTickets api={"http://127.0.0.1:3000/api/users/myTickets"} userType={1} />      
              </TabPanel>

              <TabPanel value={value} index={3}>
              <ShowTickets api={"http://127.0.0.1:3000/api/tickets"} userType={1} />      
              </TabPanel>
                  </>
          }
          
          

      </Box>
  );
}
export default MainPage;

