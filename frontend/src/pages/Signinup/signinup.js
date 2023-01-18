import classNames from "classnames";
import { AiFillGithub , AiFillInstagram , AiFillTwitterCircle , AiFillLinkedin } from 'react-icons/ai';
import { useEffect, useState } from "react";
import {useNavigate} from "react-router"
import "./signinup.css";
import { Alert, Avatar, Box, Button, Snackbar, Stack, Typography } from "@mui/material";
import axios from "axios";
import {  useCookies } from "react-cookie";
import theme from "../../Utalites/Theme";
import {IoPersonCircle} from "react-icons/io5"
import { BiLogIn  } from "react-icons/bi" 
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import {baseurl} from "../../Utalites/utalities"

 export const Signinup = () => {

    const history = useNavigate();

    const [signin, setsignin] = useState(false);
    const [Name , setName] = useState("")
    const [Email , setEmail] = useState("")
    const [Password , setPassword] = useState("");
    const [PasswordConfirmation , setPasswordConfirmation] = useState("");
    const [Photo , setPhoto] = useState();
    const [CompanyName , setCompanyName] = useState("");
    const [cookies, setCookie] = useCookies(['user']);
    const [snakeData, setSnakeData] = useState([false,"",""]);


    const UploadImg = (e) => {
        if (e) setPhoto(e);

      }
    

    useEffect(() => {
        if(cookies.token !== undefined){
            history("/")
        }

    },[])


    var singcalssname = classNames(
        "container",
        {
            'right-panel-active': signin
        }
    )

    const  handlesignin = (e) => {
        e.preventDefault();

        const user = {
            "email" : Email,
            "password" : Password,
        };
        axios.post(baseurl + "/api/users/login", user)
        .then(res => { 
            setCookie('token', res.data.token, { path: '/' });
            setCookie('email', res.data.data.user.email, { path: '/' });
            setCookie('name', res.data.data.user.name, { path: '/' });
            setCookie('photo', res.data.data.user.photo , { path: '/' });
            setCookie('userType', res.data.data.user.isAdmin == 0 ? 1 : 2 , { path: '/' });
            setCookie('companyName', res.data.data.user.companyName, { path: '/' });
            setCookie('id', res.data.data.user._id, { path: '/' });

            setSnakeData([true, "You Login successfully!" , "success"]);
            setTimeout(history("/") , 5000 );
        } )
        .catch((err) =>
            setSnakeData([true, err.response.data.message , "error"])
        )

    }

    const  handlesignup = (e) => {
        e.preventDefault();

        console.log(baseurl);

        let formData = new FormData();
        formData.append('email', Email);
        formData.append('password', Password);
        formData.append('passwordConfirm', PasswordConfirmation);
        formData.append('name', Name);
        formData.append('companyName', CompanyName);
        
        if(Photo){
        formData.append('photo', Photo.target.files[0]);
        }

        axios.post(baseurl + "/api/users/signup", formData)
        .then(res => { 
            setCookie('token', res.data.token, { path: '/' });
            setCookie('email', res.data.data.user.email, { path: '/' });
            setCookie('name', res.data.data.user.name, { path: '/' });
            setCookie('photo', res.data.data.user.photo , { path: '/' });
            setCookie('userType', res.data.data.user.isAdmin == 0 ? 1 : 2 , { path: '/' });
            setCookie('companyName', res.data.data.user.companyName, { path: '/' });
            setCookie('id', res.data.data.user._id, { path: '/' });
            setSnakeData([true, "You SignUp successfully!" , "success"]);
            setTimeout(history("/") , 5000 );
        } )
        .catch((err) => setSnakeData([true, err.response.data.message , "error"]))
    }
  

    return (
        <Box className="loader-container">
            <Box className={singcalssname} id="container">
            <Box className="form-container sign-up-container">
                <form action="#" onSubmit={handlesignup}>
                <Box  sx={{ alignSelf: 'center' }} >
                        <Avatar variant="rounded"  sx={{ width: 160, height: 55, transform:"scale(1.2)" }} src="/Assets/CONNECT.svg" alt="CO" />
                </Box>
                    <Typography variant="h1" color={theme.palette.primary.main}>Create Account</Typography>
                    <Stack justifyContent="flex-start" alignItems="center" direction="column" spacing={1} sx={{ width: "120%", marginTop:2}} >
                            <Stack direction="row" spacing={3}  alignItems="center" sx={{marginBottom:0}}>
                            <input style={{ borderRadius:4 }} required placeholder="Name" size="small" onChange={(e)=>  setName(e.target.value)}/>
                            <input style={{ borderRadius:4 }} required placeholder="Company Name" size="small" onChange={(e)=>  setCompanyName(e.target.value)}/>
                            </Stack>

                        <input style={{ marginTop:0, borderRadius:4}}  fullWidth required type="email" placeholder="E-mail"  onChange={ (e) => setEmail(e.target.value)} />
                        <input style={{ borderRadius:4 }} fullWidth required type="password" placeholder="Password"  onChange={ (e) => setPassword(e.target.value)} />
                        <input style={{ borderRadius:4 }} fullWidth required type="password" placeholder="Confirm Password" onChange={ (e) => setPasswordConfirmation(e.target.value)} />
                        <Stack direction="row" spacing={2} >
                        <Button sx={{ borderRadius:2 , width: 165}} endIcon={<IoPersonCircle size={14}/>} variant="contained" color="secondary" component="label" onClick={ (e) => UploadImg(e) } >
                         Upload Image
                        <input hidden accept="image/*" type="file" />
                        </Button>

                        <Button sx={{ borderRadius:2 , width: 140}} endIcon={<FaRegArrowAltCircleUp size={14}/>} variant="contained" color="secondary" type="submit">Sign Up</Button>
                        </Stack>

                    </Stack>
                </form>
            </Box>
            <div className="form-container sign-in-container">
                <form action="#" onSubmit={handlesignin} >
                <Box  sx={{ alignSelf: 'center',  }} >
                        <Avatar variant="rounded"  sx={{ width: 160, height: 55, transform:"scale(1.2)" }} src="/Assets/CONNECT.svg" alt="CO" />
                </Box>
                    <Typography variant="h1" color={theme.palette.primary.main}>Sign in</Typography>
                    <span>or use your account</span>
                    <input style={{ borderRadius:4 }} required type="email" placeholder="Email" onChange={ (e) => setEmail(e.target.value) } />
                    <input style={{ borderRadius:4 , marginTop:0 }} required type="password" placeholder="Password" onChange={ (e) => setPassword(e.target.value) } />
                    <Button sx={{ borderRadius:4 , width: 150}} endIcon={<BiLogIn size={18}/>} variant="contained" color="secondary" type="submit" >Sign In</Button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={ () => setsignin(false) } >Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and let us solve your problems!</p>
                        <button className="ghost" id="signUp" onClick={ () => setsignin(true) } >Sign Up</button>
                    </div>
                </div>
            </div>
        </Box>

    <div className="footer">
    <b>	Follow us on social media </b>
        <div className="icons">
            <a href="#" target="_blank" className="social"><AiFillGithub size={30} color="#fff"/></a>
            <a href="#" target="_blank" className="social"><AiFillInstagram  size={30} color="#fff"/></a>
            <a href="#" target="_blank" className="social"><AiFillTwitterCircle  size={30} color="#fff"/></a>
            <a href="#" target="_blank" className="social"><AiFillLinkedin  size={30} color="#fff" /> </a>
            </div>
        </div>
        
        <Snackbar sx={{ width:400, }} open={snakeData[0]} autoHideDuration={3000} onClose={() => setSnakeData([false , "" , ""]) }>
            <Alert onClose={() => setSnakeData([false , "" , ""])} severity={snakeData[2]} >
                {snakeData[1]}
            </Alert >
        </Snackbar>

 
    </Box>
    )
}

export default Signinup;