import React from "react";
import Error from "./error";
import { ToastContainer, toast } from 'react-toastify';
import {useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
        import "../CSS/logIn.css"
import {useNavigate  } from "react-router-dom";
import { defaultFormat } from "moment/moment";
import variable from "./env.js";


const Login = ()=>{

// variable for hide and show the password
    const [showHidePassword, setShowHidePassword] = useState(false)

// variable for set the value of email and password
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

// calling the use navigate function
    const navigate = useNavigate();

// variable for handling the errors
    const [err, setErr] = useState("")

    // sending the login data to back-end
    const handleLogin = async (e) => {
        e.preventDefault()
        let result = await fetch(variable+"/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
                headers: {
                'Content-Type': 'application/json'
            }
        });        
        result = await result.json();
        if(result.isActive == false){
            setErr("Wrong credentials")
            return;
        }
        if (result.auth) {
                sessionStorage.setItem('token', JSON.stringify(result.auth));
                sessionStorage.setItem('name', JSON.stringify(result.firstName))
                sessionStorage.setItem('id', JSON.stringify(result.id))
            toast.success('Successfully! logged in', {
                position: toast.POSITION.TOP_center
            });
            // window.reload(true)    
            navigate('/tasks')
        }
        else if(result.responce === false){
            toast.error('Enter correct Email Id', {
                position: toast.POSITION.TOP_center
            });

        }
         else {
            toast.error('Enter EmailId or Password', {
                position: toast.POSITION.TOP_center
            });
        }
    }


    return(
        <>
<div className="loginForm">
<div className="loginForm1">
<h1 className="loginFormHeading">Login</h1>
<br/><br/>

<form>
<label>Email ID</label>
<br/><input type="text" placeholder="Enter your emailId" 
onChange={(e) => setEmail(e.target.value)} value={email}
required />
<br/> <br/><label>Password</label>
<br/><input type={showHidePassword===false ? "password" : "text"} placeholder="Enter the password" required 
onChange={(e) => setPassword(e.target.value)} value={password} />
 <br/>   
<input type="checkbox" style={{width: "20px", marginTop: "10px"}}    onChange={()=>setShowHidePassword(!showHidePassword)} /><span className="hideShowPassword">Show Password</span>

<br/><span className="errLine" style={{marginLeft: "10px"}}>{err}</span>
<br/><br/>  
<div style={{height: "80px", width: "100%", display: "flex", justifyContent: "center"}}>
<button onClick={handleLogin} type="submit">Login</button>
</div>
</form>
</div>
</div>
<ToastContainer />
        </>
    );
}

export default Login;