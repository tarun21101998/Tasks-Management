import React from "react";
import variable from "./env.js";
import { useEffect, useState } from "react";
import "../CSS/signUp.css"
import { Link ,   useNavigate  } from "react-router-dom";


const SignUp= ()=>{
    const [adminId, setAdminId ] = useState()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [err, setErr] = useState("")
    const[err1, setErr1] = useState("");
    const navigate = useNavigate();
    


    const handleSignUpData = async (e) => {
        e.preventDefault();
        if(email  && firstName && lastName && password){
        let result = await fetch(variable+"/users", {
            method: 'post',
            body: JSON.stringify({firstName, lastName, email, password}),
                headers: {
                'Content-Type': 'application/json'
            }
        });     
        result = await result.json();
        if(result.responce === true) {    
            navigate("/login")
        }
        else if(result.responce === false){
            setErr("email id already exists")
        }
        else if(result.responce ==  10){
            setErr("please enter complete detail")
        }
    }
    else{
        setErr1("Fill the complete form")
    }
    }


    // console.log(isType)
    return(
        <>
<div className="form">
<div className="form1">
<h1 className="formHeading">Signup</h1>
<br/><br/>

<form>
<label> First Name </label>
<br/><input type="text" placeholder="Enter your first name" 
onChange={(e) => setFirstName(e.target.value)} value={firstName}
required />
<br/><br/><label> Last Name </label>
<br/><input type="text" placeholder="Enter your last name" 
onChange={(e) => setLastName(e.target.value)} value={lastName}
required />

<br/>
<br/><label>Email ID</label>
<br/><input type="text" placeholder="Enter your emailId" 
onChange={(e) => setEmail(e.target.value)} value={email}
required />
<br/> <br/><label>Password</label>
<br/><input type="password" placeholder="Enter the password" required 
onChange={(e) => setPassword(e.target.value)} value={password} />
<br/> <br/>
<br/><span>{err}{err1}</span>

<br/>
<div style={{height: "80px", width: "100%", display: "flex", justifyContent: "center"}}>
<button  onClick={handleSignUpData} type="submit">Sign up</button>
</div>
</form>
</div>
</div>

        </>
    );
}
export default SignUp;