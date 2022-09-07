import { Autocomplete, Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { blue, red, yellow } from "@mui/material/colors";
import axios from "axios";
import * as React from "react";
import {MdSend} from "react-icons/md"
import theme from "../../Utalites/Theme";

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

  
  const [ suggestedprojects, setsuggestedprojects ] =React.useState(["News"]) ;
  
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [Category, setCategory] = React.useState('Server');

  
  const SubmitTicket = async (e) => {

    if(NewProject == 1){
      const response = await axios.post("/api/projects/create", {name:project});
      setProjectID(response.data.ProjectID);
    };

    e.preventDefault()
    let attach =[];
    console.log( "project : ", project ,"title :", Title , "priority :", Priority , "Description :",  Description , "category :", Category);
      try {
        const data = {
          "project" : project, 
          "subject" : Title,
          "priority" : Priority,
          "description" : Description,
          "category" : Category,
          "attachments" : attach,
          }
        await axios.post("/api/tickets", data, {
          headers: {
            "Authentication": "PPrr :"   // add token here
          },
        });
      } catch (err) {
        alert(err);
      }
    
  }



  const renderProjectPanel = (_new) => {
    console.log(_new, _new == 1);
    if(_new == 1){
      return <TextField
              label="New Project"
              type="text"
              fullWidth
              required
              onChange={(event, newValue) => {
                setProject(newValue);
                }}
              sx={{ width: 300, marginLeft:6 }}
              />
    }else {
      return <Autocomplete
      disablePortal
      required
      options={suggestedprojects}
      onInputChange={(event, newValue) => {
      // make request with each change
      setProject(newValue);
      setProjectID(5);
      }}
      error={projecterror}
      sx={{ width: 300, marginLeft:6 }}
      renderInput={(params) => <TextField {...params} label="Old Project" />  }
      />
    }


  };


  return (
        <form sx={{ display: 'flex', flexWrap: 'wrap', width: 100}} onSubmit={SubmitTicket} >
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
              fullWidth
              required
              error={TitleError}
              onChange={(e) => setTitle(e.target.value) }
              sx={{ width: 1000, marginLeft:9,  }}
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

              <InputLabel id="demo-simple-select-label">Category</InputLabel>
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
                  <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
                  <RadioGroup
                    required
                    defaultValue={1}
                    row
                    onChange={(e) =>{ setPriority(e.target.value); console.log(e.target.value); } }
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
                label="Multiline Placeholder"
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
              <Button sx={{marginLeft:14}} variant="contained" component="label">
                  Upload Imgs
                  <input hidden accept="image/*" multiple type="file" />
              </Button>
              <Button variant="contained" endIcon={<MdSend />}  type="submit"  >
                submit
              </Button>

            </Stack>




          </Stack>

          
        </form>
  );

};

export default CreateTicket;