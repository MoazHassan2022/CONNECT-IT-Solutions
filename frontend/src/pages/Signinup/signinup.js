import classNames from "classnames";
import { AiFillGithub , AiFillInstagram , AiFillTwitterCircle , AiFillLinkedin } from 'react-icons/ai';
import { useEffect, useState } from "react";
import {useNavigate} from "react-router"
import "./signinup.css";
import { Alert, Avatar, Box, Button, IconButton, Snackbar, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import {  useCookies } from "react-cookie";
import theme from "../../Utalites/Theme";
import {IoPersonCircle} from "react-icons/io5"

 export const Signinup = () => {

    const history = useNavigate();

    const [signin, setsignin] = useState(false);
    const [errorlogin, seterrorlogin] = useState(false);
    const [errorSignup, seterrorSignup] = useState(false);

    const [Name , setName] = useState("")
    const [Email , setEmail] = useState("")
    const [Password , setPassword] = useState("");
    const [PasswordConfirmation , setPasswordConfirmation] = useState("");
    const [Photo , setPhoto] = useState();
    const [CompanyName , setCompanyName] = useState("");
    const [cookies, setCookie] = useCookies(['user']);


    const UploadImg = (e) => {
        if (e) setPhoto(e);
      }
    

    useEffect(() => {
        if(cookies.token != undefined){
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
        axios.post("http://127.0.0.1:3000/api/users/login", user)
        .then(res => { 
            setCookie('token', res.data.token, { path: '/' });
            setCookie('email', res.data.data.user.email, { path: '/' });
            setCookie('name', res.data.data.user.name, { path: '/' });
            setCookie('photo', res.data.data.user.photo , { path: '/' });
            setCookie('userType', res.data.data.user.isAdmin == 0 ? 1 : 2 , { path: '/' });
            setCookie('companyName', res.data.data.user.companyName, { path: '/' });
            setCookie('id', res.data.data.user._id, { path: '/' });
            history("/"); 
        } )
        .catch((err) =>{
            seterrorlogin(1);
        })
    }

    const  handlesignup = (e) => {
        e.preventDefault();

        var resopnse;
        let formData = new FormData();
        formData.append('email', Email);
        formData.append('password', Password);
        formData.append('passwordConfirm', PasswordConfirmation);
        formData.append('name', Name);
        formData.append('companyName', CompanyName);
        formData.append('photo', Photo.target.files[0]);

        axios.post("http://127.0.0.1:3000/api/users/signup", formData)
        .then(res => { 
            setCookie('token', res.data.token, { path: '/' });
            setCookie('email', res.data.data.user.email, { path: '/' });
            setCookie('name', res.data.data.user.name, { path: '/' });
            setCookie('photo', res.data.data.user.photo , { path: '/' });
            setCookie('userType', res.data.data.user.isAdmin == 0 ? 1 : 2 , { path: '/' });
            setCookie('companyName', res.data.data.user.companyName, { path: '/' });
            setCookie('id', res.data.data.user._id, { path: '/' });
            history("/"); 
        } )
        .catch((err) =>{
            console.log(err);
            seterrorSignup(1);
        })
    }
  

    return (
        <div className="loader-container">
            <div className={singcalssname} id="container">
            <div className="form-container sign-up-container">
                <form action="#" onSubmit={handlesignup}>
                    <Typography variant="h1">safacotech</Typography>
                    <Typography variant="h2">Create Account</Typography>

                    <Stack   justifyContent="center"
                    alignItems="center"
                    direction="column" spacing={1} sx={{ width: "120%", }} >

                            <Stack direction="row" spacing={4} sx={{marginTop: 5}}>
                            <TextField 
                            variant="filled"
                            required
                                    sx={{
                                        width: { md: 150 },
                                        "& .MuiInputBase-root": {
                                            height: 60
                                        }
                                    }}
                                label="Name"
                                onChange={(e)=>  setName(e.target.value)}
                            />

                            <TextField 
                            required
                            variant="filled"
                                    sx={{
                                        width: { md: 160 },
                                        "& .MuiInputBase-root": {
                                            height: 60
                                        }
                                    }}
                                
                            label="Company Name"
                            onChange={(e)=>  setCompanyName(e.target.value)}
                            />
                                
                            </Stack>

                        <TextField variant="filled" fullWidth required type="email" label="email"  onChange={ (e) => setEmail(e.target.value)} />
                        <TextField variant="filled" fullWidth required type="password" label="password"  onChange={ (e) => setPassword(e.target.value)} />
                        <TextField variant="filled" fullWidth required type="password" label="confirm password" onChange={ (e) => setPasswordConfirmation(e.target.value)} />
                        <Stack direction="row" >

                        <Button variant="contained" component="label" onClick={ (e) => UploadImg(e) } >
                            <IoPersonCircle size={14}/>
                         Upload Img
                        <input hidden accept="image/*" type="file" />
                        </Button>

                        <Button type="submit">Sign Up</Button>
                        </Stack>

                    </Stack>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="#" onSubmit={handlesignin} >
                    <h2>safacotech</h2>
                    <h1>Sign in</h1>
                    <span>or use your account</span>
                    <input required type="email" placeholder="Email" onChange={ (e) => setEmail(e.target.value) } />
                    <input required type="password" placeholder="Password" onChange={ (e) => setPassword(e.target.value) } />
                    <a href="#">Forgot your password?</a>
                    <button >Sign In</button>
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
                        <p>Enter your personal details and let us solve your problems</p>
                        <button className="ghost" id="signUp" onClick={ () => setsignin(true) } >Sign Up</button>
                    </div>
                </div>
            </div>
        </div>

    <div className="footer">
    <b>	Follow us on social media </b>
        <div className="icons">
            <a href="#" target="_blank" className="social"><AiFillGithub size={30} color="#fff"/></a>
            <a href="#" target="_blank" className="social"><AiFillInstagram  size={30} color="#fff"/></a>
            <a href="#" target="_blank" className="social"><AiFillTwitterCircle  size={30} color="#fff"/></a>
            <a href="#" target="_blank" className="social"><AiFillLinkedin  size={30} color="#fff" /> </a>
            </div>
        </div>
        
        <Snackbar sx={{ width:400, }} open={errorlogin} autoHideDuration={6000} onClose={() => seterrorlogin(false) }>
            <Alert onClose={() => seterrorlogin(false)} severity="error" >
                wrong E-mail or Password!!
            </Alert>
        </Snackbar>
        <Snackbar sx={{ width:400, }} open={errorSignup} autoHideDuration={6000} onClose={() => seterrorSignup(false) }>
            <Alert onClose={() => seterrorSignup(false)} severity="error" >
                wrong WRong info!!
            </Alert>
        </Snackbar>

 
    </div>
    )
}

export default Signinup;