import { Alert, Autocomplete, Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { blue, red, yellow } from "@mui/material/colors";
import axios from "axios";
import * as React from "react";
import { useCookies } from "react-cookie";
import { BsFillCloudUploadFill } from "react-icons/bs";
import {MdSend} from "react-icons/md"
import { useNavigate } from "react-router";
import theme from "../../Utalites/Theme";
import {baseurl} from "../../Utalites/utalities"

const CreateTicket = () => {

  const [NewProject , setNewProject] = React.useState(0);
  const [project , setProject] = React.useState();
  const [ProjectID , setProjectID] = React.useState();
  const [projecterror , setprojecterror] = React.useState(false);


  const [Title , setTitle] = React.useState("");
  const [TitleError , setTitleError] = React.useState(false);

  const [Priority , setPriority] = React.useState(1);
  const [selectedValue, setSelectedValue] = React.useState('a');


  const [Description , setDescription] = React.useState("");
  const [DescriptionError , setDescriptionError] = React.useState(false);

  const [Imgs , setImgs] = React.useState([]);
  
  const [ suggestedprojects, setsuggestedprojects ] =React.useState([]) ;
  
  
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [Category, setCategory] = React.useState('Service');
  const history = useNavigate();

  const [cookies, setCookie] = useCookies(['user']);

  const [snakeData, setSnakeData] = React.useState([false,"",""]);
  // state , message , servity
  
  const SubmitTicket = async (e) => {
    e.preventDefault();
    const auth = "Bearer " + cookies.token;
    var pro = ProjectID;
    if(NewProject == 1){
      console.log(project);
      await axios.post(baseurl + "/api/projects", {name:project},  {headers:{
        authorization: auth, 
      }}).then(res => {setProjectID(res.data.data.project._id); pro = res.data.data.project._id; 
        setSnakeData([true, "Project is successfully created" , "success"]);
      })
      .catch(err => setSnakeData([true, err.response.data.message , "error"]));
    };
    
    let formData = new FormData();
    formData.append('project', pro);
    formData.append('subject', Title);
    formData.append('priority', Priority);
    formData.append('description', Description);
    formData.append('category', Category);


    if(Imgs[0] != undefined){
      for (let i = 0; i < Imgs[0].target.files.length; i++) {
        formData.append('attachments', Imgs[0].target.files.item(i));
      }
    }


    //console.log(Imgs , Imgs[0].target.files);
    await axios.post(baseurl + "/api/tickets", formData,  
    {headers:{
      authorization: auth, 
    }}).then(res => {
      console.log(res);
      setSnakeData([true, "Ticket is successfully created" , "success"]);
      setTimeout(window.location.reload() , 5000 );
    }).catch(error => setSnakeData([true, error.response.data.message , "error"]) );

  }

  const fetchProjects = async (text) => {
    const auth = "Bearer " + cookies.token;
     const res = await axios.get(`/api/projects?name=${text}`, {headers:{
      authorization: auth,
    }});  
    return [res.data.results, res.data.data.projects];
  }

  const renderProjectPanel = (_new) => {
    if(_new == 1){
      return <TextField
              label="New Project"
              type="text"
              fullwidth
              required
              onChange={(e) => {
                setProject(e.target.value);
                }}
              sx={{ width: 300, marginLeft:6 }}
              />
    }else {
      return <Autocomplete
      disablePortal
      required
      onChange={(event, newValue) => {
        console.log(newValue);
        setProjectID(newValue._id);
        setProject(newValue.name);
      }}
      options={suggestedprojects}
      getOptionLabel={(option) => option.name}
      onInputChange={(event, newValue) => {
      // make request with each change
      setProjectID(-1);
      fetchProjects(newValue).then((res) => {
        if(res[0] > 0){
          setsuggestedprojects(res[1]);
        }else {
          setsuggestedprojects([]);
        }
      });
    }}
        
      error={projecterror}
      sx={{ width: 300, marginLeft:6 }}
      renderInput={(params) => <TextField {...params} label="Old Project" />  }
      />
    }


  };

  const UploadImgs = (e) => {
    if (e) setImgs([...Imgs, e]);
  }


  return (
        <form sx={{ display: 'flex', flexWrap: 'wrap', width: 100 , bgcolor:"#000"}} onSubmit={SubmitTicket} >
          <Stack 
            sx={{ marginLeft:"28.5vh"}}
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography variant="h4" color="primary">
              Submit Ticket
            </Typography>

            <Stack direction="row"   justifyContent="center" alignItems="center" >
              <Typography align="center" sx={{fontSize:22}} color="primary">
                  Title 
              </Typography>
              <TextField
              id="outlined-password-input"
              label="Title"
              type="text"
              fullwidth
              required
              error={TitleError}
              onChange={(e) => setTitle(e.target.value) }
              sx={{ width: 1000, marginLeft:9.5,  }}
              />
            </Stack>

            <Stack direction="row" spacing={8} >
              <Stack direction="row" justifyContent="center" alignItems="center">
                <Typography align="center" sx={{fontSize:22}} color="primary">
                    Project
                </Typography>
                  {renderProjectPanel(NewProject)}
                  <RadioGroup
                    required
                    defaultValue={0}
                    row
                    onChange={(e) =>{ setNewProject(e.target.value); console.log(e.target.value); } }
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"  
                    sx={{paddingLeft:1}}
                  >
                    <Stack direction="column" spacing={0}>
                          <FormControlLabel value={1} control={<Radio sx={{color: theme.palette.primary.main,'&.Mui-checked': {color: theme.palette.primary.main ,}, height:10, }} />} label="New Project" />
                          <FormControlLabel  value={0} control={<Radio  sx={{color: "#000",'&.Mui-checked': {color: "#000",}, height:10, }}/>} label="Old Project"  />
                    </Stack>
              </RadioGroup>
              </Stack>

              <Stack direction="column" justifyContent="center" alignItems="center">

              <Typography  color="primary">Category</Typography>
              <Select
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={"Service"}>Service</MenuItem>
                <MenuItem value={"System"}>System</MenuItem>
                <MenuItem value={"Network"}>Network</MenuItem>
                <MenuItem value={"Telecommunications"}>Telecommunications</MenuItem>
              </Select>
                  </Stack>

              <Stack direction="column" justifyContent="center" alignItems="center">
                <Typography  color="primary">Priority</Typography>
                  <RadioGroup
                    required
                    defaultValue={1}
                    row
                    onChange={(e) =>{ setPriority(e.target.value); } }
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"  
                  >
                    <FormControlLabel value={1} control={<Radio sx={{color: blue[800],'&.Mui-checked': {color: blue[600],},}} />} label="ordinary" />
                    <FormControlLabel value={2} control={<Radio sx={{color: yellow[800],'&.Mui-checked': {color: yellow[600],},}} />} label="importtant"  />
                    <FormControlLabel  value={3} control={<Radio  sx={{color: red[800],'&.Mui-checked': {color: red[600],},}}/>} label="Critical"  />
                  </RadioGroup>

              </Stack>

            </Stack>


            <Stack direction="row" justifyContent="center" alignItems="flex-start">
                <Typography align="center" sx={{fontSize:22}} color="primary">
                    Description
                </Typography>
                <TextField
                id="outlined-textarea"
                label="Description"
                placeholder="Placeholder"
                multiline
                minRows={3}
                maxRows={15}
                onChange={(e) => setDescription(e.target.value) }
                error={DescriptionError}
                sx={{ width:1000 , marginLeft:1}}
                required
                />

            </Stack>

            <Stack  direction="row" justifyContent="center" alignItems="flex-start" spacing={4}>
              <Button color="secondary" sx={{marginLeft:14}} endIcon={< BsFillCloudUploadFill color="secondary" />} variant="contained" component="label" onChange={UploadImgs} >
                <Typography variant="contained" >
                    Upload Files/Images
                  </Typography>
                  <input hidden multiple type="file" />
              </Button>
              <Button variant="contained" color="secondary" endIcon={<MdSend color="secondary" />}  type="submit"  >
               submit
              </Button>

            </Stack>
          </Stack>

        <Snackbar sx={{ width:400, }} open={snakeData[0]} autoHideDuration={3000} onClose={() => setSnakeData([false , "" , ""]) }>
            <Alert onClose={() => setSnakeData([false , "" , ""])} severity={snakeData[2]} >
                {snakeData[1]}
            </Alert >
        </Snackbar>

        </form>
  );

};

export default CreateTicket;