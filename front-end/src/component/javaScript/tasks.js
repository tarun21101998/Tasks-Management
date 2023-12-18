import React, { useEffect } from "react";
import moment from"moment";
import { useState} from "react";
import variable from "./env";
import "../CSS/tasks.css"
import { backIn } from "framer-motion";


const Tasks = ()=>{

  const token = JSON.parse(sessionStorage.getItem('token'))

// getting the id of user
  const id = JSON.parse(sessionStorage.getItem('id'))

// getting the particular tasks id
  const [tasksId, setTasksId] = React.useState("")

// show and hide the popup of add and edit tasks
  const [hide, setHide] = React.useState(false)
  const [editHide, setEditHide] = React.useState(false)
  
  // variable for new task
  const [newTasks, setNewTasks] = React.useState("")
  const [fromDate, setFromDate] = React.useState('0000-00-00T00:00')
const [toDate, setToDate] =  React.useState(0)
  
  // array for all the tasks
  const [arr, setArr] = React.useState([])

// variable for saving userDetails
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")

// variable for edit the tasks
  const [editTasks, setEditTasks] = React.useState("")



// function for get the user details
  const getUserDetails = async()=>{
    let result = await fetch(`${variable}/getUserDetails?token=${token}`, {
      method: 'get',
      // body: JSON.stringify({token}),
      headers: {
        'Content-Type': 'application/json'
    }
    });
    result = await result.json();
setFirstName(result.firstName)
setLastName(result.lastName)
  }

  // function for getting the user tasks
  const getUserTasks = async ()=>{
    // e.preventDefault()
    let result = await fetch(`${variable}/usertasks?token=${token}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
    }
    });
    result = await result.json();
  setArr(result.user)
  }

// calling the function of user details
  useEffect(()=>{
    getUserDetails()
  }, [])

  // calling the function for user tasks
  useEffect(()=>{    
    getUserTasks()
  }, []);

  // function for sending the new tasks to back-end
  const handleNewTasks= async()=>{
    let result = await fetch(variable+"/tasks", {
      method: 'post',
      body: JSON.stringify({fromDate, toDate,  token, newTasks}),
          headers: {
          'Content-Type': 'application/json'
      }
  });     
  setHide(!hide)
  getUserTasks();
  }

  // function for editing the tasks
const handleEditTasks = async (e)=>{
  await fetch(variable+"/editTasks", {
    method: 'put',
    body: JSON.stringify({tasksId, editTasks, fromDate, toDate, token}),
    headers: {
        'Content-Type': 'application/json'
    }
});
setEditHide(!editHide)
getUserTasks()
}

// function for deleting the tasks
const deleteTasks=  async(value)=>{
  await fetch(variable+"/deleteTasks", {
    method: 'delete',
    body: JSON.stringify({value, token}),
    headers: {
        'Content-Type': 'application/json'
    }
  });
  getUserTasks()
}

// function for  changing the use state variable of fromDate
const handleFromDate = (e)=>{
  e.preventDefault()
  setFromDate(e.target.value)

}

// function for  changing the use state variable of toDate
const handleToDate = (e)=>{
  e.preventDefault()  
  setToDate(e.target.value)
}


  return(
  <>
  <div className="addNewTasks">
    <h1>Hey,{firstName +" " + lastName} </h1>
<button onClick={()=>{{
  setNewTasks("")
  setFromDate("")
  setToDate("")
  setHide(!hide)}}}>Add new task</button>
{hide===true ?
<div className="popUp1">
  <h1>Enter your new task</h1>
<input type="text" placeholder="Enter  your new task"  onChange={(e)=>{setNewTasks(e.target.value)}} value={newTasks} />

  <br/>

  <label style={{marginLeft: "20px"}}>From</label>
  <input type="datetime-local" step="2" required className="pop1Input" onChange = {handleFromDate} style={{width: "40%"}} value={fromDate}/>

<br/>
  <label style={{marginLeft: "20px"}}>To &nbsp; &nbsp; </label>
<input type="datetime-local" step="2" className= "pop1Input" onChange={(e)=>{setToDate(e.target.value)}} required style={{width: "40%"}} value={toDate} />

  <button onClick={handleNewTasks}  type="submit">OK</button>
  <button onClick={()=>{setHide(!hide)}}>Cancel</button>
  </div>
  :
  <></>}
  </div>
  {/* <div className="data"> */}
  <table className="table table1">
          <thead>
            <tr className="tableHead">
              <th className="table table2">Tasks</th>
              <th className="table table2">From</th>
              <th className="table table2">To</th>


              <th className="table table2">Creation time</th>
              <th className="table table2">Edit/Delete</th>
            </tr>

          </thead>


          <tbody>
            {arr.map((values, index) => (
            //  <> 
              <tr key={index}>
                                {/* <td className="table">{values._id}</td> */}
                <td className="table">{values.tasks}</td>
                <td className="table">{moment(values.from).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td className="table">{moment(values.to).format('MMMM Do YYYY, h:mm:ss a')}</td>

                <td className="table">{moment(values.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td className="table"> <button onClick={(e)=>{{
                  console.log(values)
                  let startDate = moment(values.from).format("YYYY-MM-DDTHH:mm:SS")
                  let endDate = moment(values.to).format("YYYY-MM-DDTHH:mm:SS")
      
                  startDate = startDate.toString()
                  endDate = endDate.toString()
setFromDate(startDate)
setToDate(endDate)
                  setTasksId(values)
                  setEditTasks(values.tasks)
                  setEditHide(!editHide)
                }}}>Edit</button> /<button onClick={()=>deleteTasks(values._id)}>delete</button></td>
                {editHide===true ?
<div className="popUp1">
  <h1>Edit your task</h1>
<input type="text" placeholder="Edit your task"  onChange={(e)=>{setEditTasks(e.target.value)}} value={editTasks} />

<label style={{marginLeft: "20px"}}>From</label>
  <input type="datetime-local" step="2" required className="pop1Input" onChange = {handleFromDate} style={{width: "40%"}} value={fromDate}/>

<br/>
  <label style={{marginLeft: "20px"}}>To &nbsp; &nbsp; </label>
<input type="datetime-local" step="2" className= "pop1Input" onChange={(e)=>{setToDate(e.target.value)}} required style={{width: "40%"}} value={toDate} />
  <br/>
  <button onClick={handleEditTasks}  type="submit">OK</button>
  <button onClick={()=>{setEditHide(!editHide)}}>Cancel</button>
  </div>
  :
  <></>}
              </tr>
            ))}

          </tbody>
        </table>

  {/* </div> */}
  

  </>
)
}
export default Tasks;