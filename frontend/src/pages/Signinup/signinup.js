import classNames from "classnames";
import { AiFillGithub , AiFillInstagram , AiFillTwitterCircle , AiFillLinkedin } from 'react-icons/ai';
import { useState } from "react";
import  logo  from "../../Utalites/outimports";
import "./signinup.css";


 export const Signinup = () => {
    const [signin, setsignin] = useState(false);
    
    var singcalssname = classNames(
        "container",
        {
            'right-panel-active': signin
        }
    )
    return (
        <div className="loader-container">
            <div className={singcalssname} id="container">
            <div className="form-container sign-up-container">
                <form action="#">
                    <h2>safacotech</h2>
                    <h1>Create Account</h1>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button onClick={ () => setsignin(false) }>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="#">
                    <h2>safacotech</h2>
                    <h1>Sign in</h1>
                    <span>or use your account</span>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
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
    </div>
    )
}