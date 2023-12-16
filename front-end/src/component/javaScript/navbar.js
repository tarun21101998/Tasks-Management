import { Link, useNavigate, Outlet } from "react-router-dom";
import { FaBeer } from 'react-icons/fa';
import { motion } from "framer-motion"
import jwt from "jwt-decode";import "./App.css"
import React from "react";
const Navbar = () => {

    const auth = sessionStorage.getItem('token')
    const [hide, setHide]= React.useState(false)
    const navigate = useNavigate();
    // console.log(auth)
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
<li>                                <Link onClick={()=>setHide(!hide)}  to="/tasks"><h3>My Tickets</h3></Link>
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