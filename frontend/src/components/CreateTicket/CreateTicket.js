import { Autocomplete, Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { blue, red, yellow } from "@mui/material/colors";
import axios from "axios";
import * as React from "react";
import {MdSend} from "react-icons/md"

const CreateTicket = () => {

  const [project , setProject] = React.useState();
  const [projecterror , setprojecterror] = React.useState(false);


  const [Title , setTitle] = React.useState("");
  const [TitleError , setTitleError] = React.useState(false);

  const [Priority , setPriority] = React.useState("ordinary");
  const [selectedValue, setSelectedValue] = React.useState('a');


  const [Description , setDescription] = React.useState("");
  const [DescriptionError , setDescriptionError] = React.useState(false);
  
  const [ suggestedprojects, setsuggestedprojects ] =React.useState(["News"]) ;
  
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [Category, setCategory] = React.useState('Server');

  
  const SubmitTicket = async (e) => {
    e.preventDefault()
    console.log( "project : ", project ,"title :", Title , "priority :", Priority , "Description :",  Description , "category :", Category);
      try {
        const data = {
          "Project" : project, 
          "Title" : Title,
          "Priority" : Priority,
          "Description" : Description,
            "Category" : Category,
          }
        await axios.post("/api/", data, {
          headers: {
            "Authentication": "PPrr"   // add token here
          },
        });
      } catch (err) {
        alert(err);
      }
    
  }



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

            <Stack direction="row"   justifyContent="center" alignItems="center">
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

            <Stack direction="row" spacing={15} >
              <Stack direction="row" justifyContent="center" alignItems="center">
                <Typography align="center" sx={{fontSize:22}} color="primary">
                    Project
                </Typography>
                  <Autocomplete
                  disablePortal
                  freeSolo
                  id="combo-box-demo"
                  options={suggestedprojects}
                  onInputChange={(event, newValue) => {
                  // make request with each change
                  setProject(newValue);

                  }}
                  error={projecterror}
                  sx={{ width: 300, marginLeft:6 }}
                  renderInput={(params) => <TextField {...params} label="Movie" />  }
                  />
              </Stack>

              <Stack direction="column" justifyContent="center" alignItems="center">

              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={"Server"}>Server</MenuItem>
                <MenuItem value={"System"}>System</MenuItem>
                <MenuItem value={"Networt"}>Networt</MenuItem>
                <MenuItem value={"telecomunications"}>telecomunications</MenuItem>
              </Select>

                  </Stack>

              <Stack direction="column" justifyContent="center" alignItems="center">
                  <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
                  <RadioGroup
                    required
                    defaultValue="ordinary"
                    row
                    onChange={(e) =>{ setPriority(e.target.value); console.log(e.target.value); } }
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"  
                  >
                    <FormControlLabel value="ordinary" control={<Radio sx={{color: blue[800],'&.Mui-checked': {color: blue[600],},}} />} label="ordinary" />
                    <FormControlLabel value="importtant" control={<Radio sx={{color: yellow[800],'&.Mui-checked': {color: yellow[600],},}} />} label="importtant"  />
                    <FormControlLabel  value="Critical" control={<Radio  sx={{color: red[800],'&.Mui-checked': {color: red[600],},}}/>} label="Critical"  />
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