import React, { useEffect } from "react";
import moment from"moment";
import variable from "./env";
import "../CSS/tasks.css"
const Tasks = ()=>{
  const token = JSON.parse(sessionStorage.getItem('token'))
  // console.log(token)
  const id = JSON.parse(sessionStorage.getItem('id'))
  const [tasksId, setTasksId] = React.useState("")
// console.log(id)
  const [hide, setHide] = React.useState(false)
  const [editHide, setEditHide] = React.useState(false)
  const [newTasks, setNewTasks] = React.useState("")
  const [arr, setArr]= React.useState([]);
  // const id = JSON.parse(sessionStorage.getItem('id'));
  // console.log(newTasks)
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [editTasks, setEditTasks] = React.useState("")



  const getUserDetails = async()=>{
    let result = await fetch(`${variable}/getUserDetails?token=${token}`, {
      method: 'get',
      // body: JSON.stringify({token}),
      headers: {
        'Content-Type': 'application/json'
    }

    });
    result = await result.json();
// console.log(result)
setFirstName(result.firstName)
setLastName(result.lastName)
  }

  React.useEffect(()=>{
    getUserDetails()
    // getUserTasks()
  })

  React.useEffect(()=>{
    const getUserTasks = async ()=>{
      let result = await fetch(`${variable}/usertasks?token=${token}`, {
        method: 'get',
        // body: JSON.stringify({token}),
        headers: {
          'Content-Type': 'application/json'
      }
    
      });
      result = await result.json();
    // console.log(result.user)
    setArr(result.user)
    }
    
    getUserTasks()
  })
  const handleNewTasks= async()=>{
    let result = await fetch(variable+"/tasks", {
      method: 'post',
      body: JSON.stringify({tasksId,  token, newTasks}),
          headers: {
          'Content-Type': 'application/json'
      }
  });     
  setHide(!hide)
  }
  
const handleEditTasks = async (e)=>{
  console.log(tasksId)
  console.log("hello")
  await fetch(variable+"/editTasks", {
    method: 'put',
    body: JSON.stringify({tasksId, editTasks, token}),
    headers: {
        'Content-Type': 'application/json'
    }
    // navigate('/')
});
setEditHide(!editHide)
}

const deleteTasks=  async(value)=>{
  await fetch(variable+"/deleteTasks", {
    method: 'delete',
    body: JSON.stringify({value, token}),
    headers: {
        'Content-Type': 'application/json'
    }
  });
}


  return(
  <>
  <div className="addNewTasks">
    <h1>Hey,{firstName +" " + lastName} </h1>
<button onClick={()=>{setHide(!hide)}}>Add new task</button>
{hide===true ?
<div className="popUp1">
  <h1>Enter your new task</h1>
<input type="text" placeholder="Enter  your new task"  onChange={(e)=>{setNewTasks(e.target.value)}} value={newTasks} />
  <br/>
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
              <th className="table table2">Created At</th>
              <th className="table table2">Updated At</th>
              <th className="table table2">Edit/Delete</th>
            </tr>

          </thead>


          <tbody>
            {arr.map((values, index) => (
            //  <> 
              <tr key={index}>
                                {/* <td className="table">{values._id}</td> */}
                <td className="table">{values.tasks}</td>
                <td className="table">{moment(values.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td className="table">{moment(values.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td className="table"> <button onClick={(e)=>{{
                  console.log(values)
                  setTasksId(values)
                  setEditTasks(values.tasks)
                  setEditHide(!editHide)
                }}}>Edit</button> /<button onClick={()=>deleteTasks(values._id)}>delete</button></td>
                {editHide===true ?
<div className="popUp1">
  <h1>Edit your task</h1>
<input type="text" placeholder="Edit your task"  onChange={(e)=>{setEditTasks(e.target.value)}} value={editTasks} />
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