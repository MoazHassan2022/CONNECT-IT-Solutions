import { Autocomplete, BottomNavigation, BottomNavigationAction,  Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { useState } from "react";
import Draggable from 'react-draggable';
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { RiArrowUpDownFill } from "react-icons/ri";
import { IconButton , useTheme } from "@mui/material";
import {GrAddCircle, GrPowerReset} from "react-icons/gr"
import axios from "axios";
import { useCookies } from "react-cookie";
import { MdOutlineCancel, MdOutlineCheckCircle } from "react-icons/md";



function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} sx={{bgcolor: "#edebe6"}} />
      </Draggable>
    );
  }
  




export const Filter =({open , handleClose  , fetch , baseapi , tabnumber }) =>{
    const theme = useTheme();

    const [sorton , setSorton] = useState("Priority");
    var sortSelections;
    if(tabnumber == 1) sortSelections = ["Priority" , "Status" , "Created at"];
    else sortSelections = ["Priority" , "Created at"];

    const [sortselect , setSortSelect] = useState(
  {
  "Priority" : 0,
  "Status" : 0,
  "Created at" : 0,
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


  
  const [choseon , setchoseon] = useState("Project");
  const ChoseSelections = ["Project" , "Category" , "Title includes"];

  const [choseSelect , setchoseSelect] = useState(
    {
    "Project" : {"id": -1 , "name": ""},
    "Category" : "All",
    "Title includes" : "",
    }
    );


    const cateories = ["All","Service" , "System" , "Network" , "Telecommunications"];
  const [Category, setCategory] = useState('All');
  const [Title , setTitle] = useState("");
  const [titleSubtitle, setTitleSub] = useState(false);
  const [Project , setProject] = useState({"id":-1 , "name" : ""});

  

  const ProjectAutoComplete = () => {
  const [ suggestedprojects, setsuggestedprojects ] = useState([]) ;

  const fetchProjects = async (text) => {
    const auth = "Bearer " + cookies.token;
     const res = await axios.get(`/api/projects?name=${text}`, {headers:{
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
      sx={{ width: 300,  marginLeft:6,bgcolor: theme.palette.secondary.main  , borderRadius:2 }}
      renderInput={(params) => <TextField  {...params}  label="Projects" />  }
      />

    );
  }

  const handleChosseChange = (e, newValue) => {
    setTitleSub(true);
    setchoseSelect( (prev) => {
        let p = prev;
        switch (choseon) {
            case "Project" : p[choseon] = {"id":newValue._id , "name" : newValue.name}; break;
            case "Category" : p[choseon] = e.target.value; break;
            case "Title includes" : {p[choseon] = Title; } break;
        }
        return p;});
        
        switch (choseon) {
            case "Project": setProject( {"id":newValue._id , "name" : newValue.name}); break;
            case "Category" : setCategory(e.target.value); break;
            case "Title includes" : return; break;
        }
  }

    const Selectcatlog = () => {
        return (
            <Select
            value={Category}
            onChange={handleChosseChange}
            sx={{width:300, bgcolor: theme.palette.secondary.main , borderRadius:2}}
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
            sx={{ width: 252 ,bgcolor: theme.palette.secondary.main  , borderRadius:2 }}
            />
            <IconButton  sx={{width:40 , height:40 , }} onClick={handleChosseChange} >
                <GrAddCircle color="primary" size={28}  />
            </IconButton>

        </Stack>
            );
    }


    const renderChosse = (ty) => {
        switch (ty) {
            case "Project" : return <ProjectAutoComplete />;
            case "Category" : return <Selectcatlog />;
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
        case "Project" : return  p[ty]["id"] != -1 ? `Project : ${p[ty]["name"]} ` : ""; break;
        case "Category" : return  `Category : ${p[ty]}`; break;
        case "Title includes" : return (Title != "" && titleSubtitle == true) ? `Title includes : ${Title}` : ""; break;
    }
}

const ResetAtt = () => {
  setSortSelect({
    "Priority" : 0,
    "Status" : 0,
    "Created at" : 0,
    });
    setchoseSelect({
      "Project" : {"id": -1 , "name": ""},
      "Category" : "All",
      "Title includes" : "",
      });
      setSorton("Priority");
      setsortcurselect(0);
      setchoseon("Project");
      setCategory('All');
      setTitle("");
      setTitleSub(false);
      setProject({"id":-1 , "name" : ""});
}


  const FilterRequest = (e) => {
    e.preventDefault();
    let api = baseapi;
    let sort = "?sort=";

    if(tabnumber == 1) sortSelections = ["Priority" , "Status" , "Created at"];

    sortSelections.map(ky => { if(sortselect[ky] != 0) { 
      sort += (sortselect[ky] == 1 ? "" : "-");
      switch(ky){
        case "Priority": sort += "priority,"; break;
        case "Status": sort += "status,"; break;
        case "Created at": sort += "createdAt,"; break;
      }


    }});
    if(sort.length > 6){
      sort = sort.slice(0, -1) + '&';
      api += sort;
    }
    let chose = "";
    if(tabnumber == 0) chose += "status=1&";
    if(tabnumber == 2) chose += "status=3&";


    let p = choseSelect;
    ChoseSelections.map(ky => {
      switch (ky) {
        case "Project" : {if(p[ky]["id"] != -1) { chose += `project=${p[ky]["id"]}&`} } break;
        case "Category" : {if(p[ky] != "All") { chose += `category=${p[ky]}&`} } break;
        case "Title includes" : {if(p[ky] != "") { chose += `subject=${p[ky]}&`} } break;
      }
    });
    if(chose.length > 0){
      if(sort.length < 8) api += '?';
      chose = chose.slice(0, -1);
      api += chose;
    }

  
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
        maxWidth="lg"
      >
        <DialogTitle style={{ cursor: 'move' , backgroundColor: theme.palette.primary.main , color: theme.palette.secondary.main , marginBottom:8}} id="draggable-dialog-title">
          Filter Tickets
        </DialogTitle>
        <DialogContent >
            <Stack sx={{marginTop:4}} direction="column" spacing={5} alignItems="center" justifyContent="flex-start">
                <Stack direction="row" spacing={5} >
                    
                    <Stack direction="column" spacing={2}>
                        <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                        <Typography sx={{fontSize:18, fontWeight: 'bold', marginLeft:9 ,color: theme.palette.primary.main}}> Sort </Typography>
                        <Select
                            sx={{width: 150, bgcolor: theme.palette.secondary.main , borderRadius:2}}
                            defaultValue="Priority"
                            value={sorton}
                            onChange={handlesortSelectionChange}
                        >
                            {sortSelections.map((sor, index) => <MenuItem value={sor}>{sor}</MenuItem> )}
                        </Select>
                        </Stack>
                        <BottomNavigation sx={{ height:55 , width: 380, bgcolor: theme.palette.secondary.main, borderRadius:2 , fontSize:20 }} value={sortcurselect} onChange={handleSortChange}>
                            <BottomNavigationAction label={<Typography fontWeight={700} fontSize={12} color={theme.palette.primary.main}>descending</Typography>} value={-1} icon={<AiOutlineArrowDown size={20} color={theme.palette.primary.main} />} />
                            <BottomNavigationAction sx={{borderRight: 1, borderLeft: 1}}  label={<Typography fontWeight={700} fontSize={12} color={theme.palette.primary.main}>NO Pref</Typography>} value={0} icon={<RiArrowUpDownFill size={20} />} />
                            <BottomNavigationAction label={<Typography fontWeight={700} fontSize={12} color={theme.palette.primary.main}>ascending</Typography>} value={1} icon={<AiOutlineArrowUp size={20} />} />
                        </BottomNavigation>
                    </Stack>

                    <Stack direction="column" spacing={2}>
                        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                        <Typography sx={{fontSize:18, fontWeight: 'bold', color: theme.palette.primary.main   }}> Chosse </Typography>
                        <Select
                            sx={{width: 150, bgcolor: theme.palette.secondary.main ,borderRadius:2}}
                            defaultValue="Project"
                            value={choseon}
                            onChange={handleChoseSelectionChange}
                        >
                            {ChoseSelections.map((cho, index) => <MenuItem key={index} value={cho}>{cho}</MenuItem> )}
                        </Select>
                        </Stack>
                        {renderChosse(choseon)}
                        
                    </Stack>

                </Stack>

                <Stack direction="column" spacing={1} sx={{width: "80%", border: 2 , borderColor: theme.palette.primary.main , padding:1 , borderRadius:4 , bgcolor: theme.palette.secondary.main}}>
                    <Typography variant="h2" font-size="20" font-weight="bold"> Criteria </Typography>
                    <Stack direction="row" spacing={6} justifyContent="flex-start" alignitems="flex-start">
                      <Stack direction="column" spacing={2}>
                        {ChoseSelections.map(ky => <Typography sx={{display: 'block',}}> {handleresult(ky)} </Typography> )}
                      </Stack>
                      <Stack direction="column" spacing={2}>
                        {sortSelections.map(ky => 
                          { 
                            if(sortselect[ky] != 0) 
                            {
                              return (<Chip sx={{marginTop:1}} 
                              icon={ sortselect[ky] == 1 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />} 
                              label={(sortselect[ky] == 1 ? "ascending " : "descending ") +  ky.toString()} 
                              />)
                              }; })}
                      </Stack>
                    </Stack>
                </Stack>

            </Stack>

        </DialogContent>
        
        <DialogActions>
          <Button color="secondary" variant="contained" endIcon={<MdOutlineCancel />} autoFocus onClick={handleClose}>Cancel</Button>
          <Button color="secondary" variant="contained" endIcon={<GrPowerReset />} onClick={ResetAtt}>Reset</Button>
          <Button color="secondary" variant="contained" endIcon={<MdOutlineCheckCircle />} onClick={FilterRequest}>Apply</Button>
        </DialogActions>

      </Dialog>


    );
}
export default Filter;