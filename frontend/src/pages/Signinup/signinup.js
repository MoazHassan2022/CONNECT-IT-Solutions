import classNames from "classnames";
import { AiFillGithub , AiFillInstagram , AiFillTwitterCircle , AiFillLinkedin } from 'react-icons/ai';
import { useEffect, useState } from "react";
import {useNavigate} from "react-router"
import "./signinup.css";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import {  useCookies } from "react-cookie";


 export const Signinup = () => {

    const history = useNavigate();

    const [signin, setsignin] = useState(false);
    const [errorlogin, seterrorlogin] = useState(false);
    const [Name , setName] = useState("")
    const [Email , setEmail] = useState("")
    const [Password , setPassword] = useState("");
    const [PasswordConfirmation , setPasswordConfirmation] = useState("");
    const [Photo , setPhoto] = useState("");
    const [CompanyName , setCompanyName] = useState("");
    const [cookies, setCookie] = useCookies(['user']);

    useEffect(() => {
        if(cookies.token){
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
        var resopnse;
        e.preventDefault();
        const user = {
            "email" : Email,
            "password" : Password,
            "passwordConfirm" : Password,
            "name": Name,
            "photo": Photo,
            "companyName": CompanyName,
        };
        fetch("/api/users/signup", user)
        .then(res => { resopnse = res.json(); localStorage.setItem("token", res.token);  } )
 
    }
  

    return (
        <div className="loader-container">
            <div className={singcalssname} id="container">
            <div className="form-container sign-up-container">
                <form action="#" onSubmit={handlesignup}>
                    <h2>safacotech</h2>
                    <h1>Create Account</h1>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" onChange={ (e) => setName(e.target.value)} />
                    <input type="email" placeholder="Email" onChange={ (e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={ (e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="Password Confirmation" onChange={ (e) => setPasswordConfirmation(e.target.value)} />
                    <button onClick={ () => setsignin(false) }>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="#" onSubmit={handlesignin} >
                    <h2>safacotech</h2>
                    <h1>Sign in</h1>
                    <span>or use your account</span>
                    <input type="email" placeholder="Email" onChange={ (e) => setEmail(e.target.value) } />
                    <input type="password" placeholder="Password" onChange={ (e) => setPassword(e.target.value) } />
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

 
    </div>
    )
}

export default Signinup;