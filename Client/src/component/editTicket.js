import React from "react";
import jwt from "jwt-decode";import "./App.css"
import "./App.css"
import {useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTicket = ()=>{
    let ticketId  = JSON.parse(sessionStorage.getItem('editId'));

    const [name, setName] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [contactNumber, setContactNumber] = React.useState(0);
    const [fromDate, setFromDate] = React.useState(0)
    const navigate = useNavigate();
    const [toDate, setToDate] = React.useState(0)
    const [message, setMessage] = React.useState("")

    const handleFromDate = (e)=>{
        e.preventDefault()
        setFromDate(e.target.value)
    }
    const handleToDate = (e)=>{
        e.preventDefault()  
        setToDate(e.target.value)
    }

    const handleRequest= async (e) => {
        if(name && number && contactNumber && fromDate && toDate){
        e.preventDefault()
        // console.log.target.value(e)
        const date1 = new Date(fromDate)
        const date2 = new Date(toDate)
        if(date1 > date2){
            console.log("short")
            toast.error('Starting date should be less than ending date', {
                position: toast.POSITION.TOP_right
            });
            
            // setMessage("Starting date should be less than ending date")
            return;
        }
        else{
            sessionStorage.removeItem('editId')
            navigate('/tickets  ')    
        await fetch("http://localhost:8000/editTicket", {
            method: 'post',
            body: JSON.stringify({ name, number, contactNumber, fromDate, toDate, ticketId}),
            headers: {
                'Content-Type': 'application/json'
            }
            // navigate('/')
        });
        setMessage("")
        navigate('/tickets')
    }
}
else{
toast.error('Please fill all field', {
    position: toast.POSITION.TOP_right
});
}

}


    return(
        <>
<div className="form">
    {/* <h1>Edit your ticket</h1> */}
<div className="form1">
<h1 className="formHeading">Edit your form</h1>
<br/><br/>
<form>
<label>Name of your vehicle</label>
<br/><input type="text" placeholder="Enter name of your vehicle" 
onChange={(e) => setName(e.target.value)} value={name}
required />
<br/> <br/>
<label>Number of your vehicle</label>
<br/><input type="text" placeholder="Enter the Number" required 
onChange={(e) => setNumber(e.target.value)} value={number} />
<br/> <br/>
<label>Contact Number </label>
<br/><input type="number" placeholder="Enter the Contact Number" required 
onChange={(e) => setContactNumber(e.target.value)} value={contactNumber} />

<br/> <br/>
<div style={{display: "flex", justifyContent: "space-between"}}>
<label>From</label>
<label style={{marginRight: "35%"}} >To</label>
</div>
{/* <br/> */}
<div style={{display: "flex", justifyContent: "space-between"}}>
<input type="datetime-local" step="2" required onChange = {handleFromDate} style={{width: "40%"}} value={fromDate}/>
<input type="datetime-local" step="2" onChange={handleToDate} required style={{width: "40%"}} value={toDate} />
</div>
<br/>
<span>{message}</span>
<br/><button onClick={handleRequest} type="submit" style={{width: "30%" }} >Submit Ticket</button>
<button onClick={()=>{
    sessionStorage.removeItem('editId')
    navigate('/tickets')
}} type="submit" style={{width: "30%" }} >Cancel</button>
</form>
</div>
</div>
<ToastContainer />
        </>
    );

}
export default EditTicket;