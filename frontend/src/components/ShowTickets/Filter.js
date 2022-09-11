import { Autocomplete, BottomNavigation, BottomNavigationAction, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useRef, useState } from "react";
import Draggable from 'react-draggable';
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { RiArrowUpDownFill } from "react-icons/ri";
import { IconButton, TableCell , useTheme } from "@mui/material";
import {GrAddCircle} from "react-icons/gr"
import axios from "axios";
import { useCookies } from "react-cookie";



function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }
  




export const Filter =({open , handleClose  , fetch , baseapi }) =>{
    const theme = useTheme();

    const [sorton , setSorton] = useState("priority");
    const sortSelections = ["priority" , "status" , "createdAt"];

    const [sortselect , setSortSelect] = useState(
  {
  "priority" : 0,
  "status" : 0,
  "createdAt" : 0,
  }
    );
    const [sortcurselect , setsortcurselect ] = useState(sortselect[sorton]);

    const handlesortSelectionChange = (e) => {
      setSorton(e.target.value);
    setsortcurselect(sortselect[e.target.value]);
  }

  const handleSortChange = (event, newValue) => {
    setSortSelect( (prev) => {
        let p = prev;
        p[sorton] = newValue;
        return p;});
        setsortcurselect(newValue);
  }

  const [cookies] = useCookies(['user']);


  
  const [choseon , setchoseon] = useState("in Project");
  const ChoseSelections = ["in Project" , "in Category" , "Title includes"];

  const [choseSelect , setchoseSelect] = useState(
    {
    "in Project" : {"id": -1 , "name": ""},
    "in Category" : "all",
    "Title includes" : "",
    }
    );


    const cateories = ["all","Service" , "System" , "Network" , "Telecommunications"];
  const [Category, setCategory] = useState('all');
  const [Title , setTitle] = useState("");
  const [titleSubtitle, setTitleSub] = useState(false);
  const [Project , setProject] = useState({"id":-1 , "name" : ""});

  

  const ProjectAutoComplete = () => {
  const [ suggestedprojects, setsuggestedprojects ] = useState([]) ;

  const fetchProjects = async (text) => {
    const auth = "Bearer " + cookies.token;
     const res = await axios.get(`http://127.0.0.1:3000/api/projects?name=${text}`, {headers:{
      authorization: auth, 
    }});  
    return [res.data.results, res.data.data.projects];
  }

    return (
    <Autocomplete
      disablePortal
      required
      onChange={handleChosseChange}
      options={suggestedprojects}
      getOptionLabel={(option) => option.name}
      onInputChange={(event, newValue) => {

      fetchProjects(newValue).then((res) => {
        if(res[0] > 0){
          setsuggestedprojects(res[1]);
        }else {
          setsuggestedprojects([]);
        }
      });
    }}
      sx={{ width: 300, marginLeft:6 }}
      renderInput={(params) => <TextField {...params} label="Projects" />  }
      />

    );
  }

  const handleChosseChange = (e, newValue) => {
    setTitleSub(true);
    setchoseSelect( (prev) => {
        let p = prev;
        switch (choseon) {
            case "in Project" : p[choseon] = {"id":newValue._id , "name" : newValue.name}; break;
            case "in Category" : p[choseon] = e.target.value; break;
            case "Title includes" : {p[choseon] = Title; } break;
        }
        return p;});
        
        switch (choseon) {
            case "in Project": setProject( {"id":newValue._id , "name" : newValue.name}); break;
            case "in Category" : setCategory(e.target.value); break;
            case "Title includes" : return; break;
        }
  }

    const Selectcatlog = () => {
        return (
            <Select
            value={Category}
            onChange={handleChosseChange}
          >
            {cateories.map((c, index) => 
                <MenuItem key={index} value={c}>{c}</MenuItem>
            )}
          </Select>
        );
    }



    const handlec = (e) =>{
        setTitle(e.target.value);
        setTitleSub(false);
    }

    const GetStartTitle = () => {
        return (
        <Stack direction="row" spacing={1} alignItems="center"> 
            <TextField
            id="outlined-password-input"
            label="Title"
            type="text"
            fullwidth
            required
            autoFocus
            defaultValue={Title}
            onChange={handlec}
            sx={{ width:"70%" , marginLeft:9,  }}
            />
            <IconButton  sx={{width:40 , height:40}} onClick={handleChosseChange} >
                <GrAddCircle size={28} />
            </IconButton>

        </Stack>
            );
    }


    const renderChosse = (ty) => {
        switch (ty) {
            case "in Project" : return <ProjectAutoComplete />;
            case "in Category" : return <Selectcatlog />;
            case "Title includes" : return <GetStartTitle />;
        }
    }

  const handleChoseSelectionChange = (e) => {
    setchoseon(e.target.value);
  //setsortcurselect(sortselect[e.target.value]);
}

const handleresult = (ty) => {
  const p = choseSelect;
    switch (ty) {
        case "in Project" : return  p[ty]["id"] != -1 ? `your Tickets should be in ${p[ty]["name"]} with id: ${p[ty]["id"]}` : ""; break;
        case "in Category" : return  `your Tickets should be in category ${p[ty]}`; break;
        case "Title includes" : return (Title != "" && titleSubtitle == true) ? `your Tickets should start with ${Title}` : ""; break;
    }
}

const ResetAtt = () => {
  setSortSelect({
    "priority" : 0,
    "status" : 0,
    "createdAt" : 0,
    });
    setchoseSelect({
      "in Project" : {"id": -1 , "name": ""},
      "in Category" : "all",
      "Title includes" : "",
      });
      setSorton("priority");
      setsortcurselect(0);
      setchoseon("in Project");
      setCategory('all');
      setTitle("");
      setTitleSub(false);
      setProject({"id":-1 , "name" : ""});
}


  const FilterRequest = (e) => {
    e.preventDefault();
    
    let api = baseapi;
    let sort = "?sort=";
    sortSelections.map(ky => { if(sortselect[ky] != 0) { 
      sort += (sortselect[ky] == 1 ? "" : "-") + ky + ",";
    }});

    if(sort.length > 6){
      sort = sort.slice(0, -1) + '&';
      api += sort;
    }

    let chose = "";
    let p = choseSelect;
    ChoseSelections.map(ky => {
      switch (ky) {
        case "in Project" : {if(p[ky]["id"] != -1) { chose += `project=${p[ky]["id"]}&`} } break;
        case "in Category" : {if(p[ky] != "all") { chose += `category=${p[ky]}&`} } break;
        case "Title includes" : {if(p[ky] != "") { chose += `subject=${p[ky]}&`} } break;
      }
    });

    if(chose.length > 0){
      if(sort.length < 8) api += '?';
      chose = chose.slice(0, -1);
      
      api += chose;
    }
    console.log(api);
  
    fetch(api);
    handleClose();
  }

    return(
        <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Filter Tickets Based on :
        </DialogTitle>
        <DialogContent >
            <Stack direction="row">
                <Stack direction="column" spacing={5} >
                    
                    <Stack direction="column">
                        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                        <Typography sx={{fontSize:18, fontWeight: 'bold',   }}> Sort Tickets on :</Typography>
                        <Select
                            sx={{width: 150,}}
                            defaultValue="Priority"
                            value={sorton}
                            label="Age"
                            onChange={handlesortSelectionChange}
                        >
                            {sortSelections.map((sor, index) => <MenuItem value={sor}>{sor}</MenuItem> )}
                        </Select>
                        </Stack>
                        <BottomNavigation sx={{ width: 400, }} value={sortcurselect} onChange={handleSortChange}>
                            <BottomNavigationAction label="descending" value={-1} icon={<AiOutlineArrowDown size={20} />} />
                            <BottomNavigationAction label="Nopref" value={0} icon={<RiArrowUpDownFill size={20} />} />
                            <BottomNavigationAction label="ascending" value={1} icon={<AiOutlineArrowUp size={20} />} />
                        </BottomNavigation>
                    </Stack>

                    <Stack direction="column" spacing={2}>
                        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                        <Typography sx={{fontSize:18, fontWeight: 'bold',   }}> Chosse Tickets on :</Typography>
                        <Select
                            sx={{width: 150,}}
                            defaultValue="in Project"
                            value={choseon}
                            onChange={handleChoseSelectionChange}
                        >
                            {ChoseSelections.map((cho, index) => <MenuItem key={index} value={cho}>{cho}</MenuItem> )}
                        </Select>
                        </Stack>
                        {renderChosse(choseon)}
                        
                    </Stack>

                </Stack>

                <Stack direction="row" spacing={3}>
                    <Stack direction="column">
                        <Typography> your Tickets will be sorted on :</Typography>
                        {sortSelections.map(ky => { if(sortselect[ky] != 0) return <Chip sx={{marginTop:1}} icon={ sortselect[ky] == 1 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />} label={(sortselect[ky] == 1 ? "ascending " : "descending ") +  ky.toString()} />;})}
                    </Stack>
                    <Stack direction="column">
                        <Typography> your Tickets will Chosen on :</Typography>
                        {ChoseSelections.map(ky => <Typography sx={{display: 'block',}}> {handleresult(ky)} </Typography> )}
                    </Stack>

                </Stack>
            </Stack>

        </DialogContent>
        
        <DialogActions>
          <Button autoFocus onClick={handleClose}>Cancel</Button>
          <Button onClick={ResetAtt}>Reset</Button>
          <Button onClick={FilterRequest}>Subscribe</Button>

        </DialogActions>

      </Dialog>


    );
}
export default Filter;