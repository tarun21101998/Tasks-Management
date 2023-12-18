import { Link, useNavigate, Outlet } from "react-router-dom";
import { FaBeer } from 'react-icons/fa';
import { motion } from "framer-motion"
import jwt from "jwt-decode";import "./App.css"
import React from "react";

// function is handling the unavbar 
const Navbar = () => {
    const auth = sessionStorage.getItem('token')

    // show and hide the navbar
    const [hide, setHide]= React.useState(false)

    // calling the use navigate function
    const navigate = useNavigate();

    // function for logging out from website
    const logout = () => {
        sessionStorage.removeItem('token');
        setHide(!hide);
        navigate('/signup')
    }

    return (
        <>
        {
            hide == false ?
            <div>
            <button onClick={()=>setHide(!hide)}><FaBeer  /> Menu
</button>
            </div>
            :
<div className="navbar">
                <button onClick={()=>setHide(!hide)}><FaBeer  /> Menu</button>
    <ul>
        {auth ? <>

{/* </li> */}
<li>                                <Link onClick={()=>setHide(!hide)}  to="/tasks"><h3>All Tasks</h3></Link>
</li>
<li>                                <Link onClick={logout} to="/login">Logout {JSON.parse(auth).name}</Link>
</li>
</>
: <>
    <li>                                <Link onClick={()=>setHide(!hide)}  to="/signup"><h3>Sign up</h3></Link>
    </li>
    <li>                                <Link onClick={()=>setHide(!hide)}  to="/login"><h3>Log in</h3></Link>
    </li>

</>

        }

    </ul>
</div>

}
            <Outlet />

            </>

    );
}
export default Navbar;