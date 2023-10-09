import React from "react";
import "./App.css"
import Login from "./login";
import { useEffect, useState } from "react";
import "./App.css"
import { Link ,   useNavigate  } from "react-router-dom";

const MyRequests= ()=>{

    const   email1 = JSON.parse(sessionStorage.getItem('token'));
    const [email, setEmail] = useState(email1)
    const [isType, setIsType]= React.useState()
    const [data, setData] = React.useState([]);
    const [arr, setArr] = useState([])
    const navigate = useNavigate();
const [val, setVal] = useState("")
const [currentPage, setCurrentPage]= useState(1)
const [dataPerPage, setDataPerPage]= useState(10)


    const filterFunction = (e)=>{
        // console.log(e.target.value);
        e.preventDefault()
        setVal(e.target.value)
      
        if(e.target.value){
          // console.log(result)
          let result = data.filter((item) => item.email.toLowerCase().includes(e.target.value.toLowerCase()) || item.number.toLowerCase().includes(e.target.value.toLowerCase()))          // console.log(result)
              setArr(result)
        }
        if(e.target.value === ""){
          setArr(data)
        }
      }
      

useEffect(()=>{

    const fetchData = async()=>{    
    let result = await fetch("http://localhost:8000/sendrequests", {
            method: 'post',
            body: JSON.stringify({email1}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        // console.log(result.data)
        setIsType(result.data)
        result= result.user1
        const data1 =  [...result].sort((a,b)=>new Date(b.updatedAt) - new Date(a.updatedAt));
        console.log(data1)
        if(result){
            setData(data1)
            setArr(data1)
            // console.log(data)
        }
    }
    fetchData();
    }, [])

// console.log(data)
const lastDataIndex = currentPage * dataPerPage
const firstPagePerIndex = lastDataIndex - dataPerPage
const newData = arr.slice(firstPagePerIndex, lastDataIndex)

const prePage = ()=>{
    if(currentPage >1 ){
      setCurrentPage(currentPage - 1)
    }
  }
  
  const nextPage = ()=>{
    // console.log(arr.length)
    if(currentPage  <= (arr.length / dataPerPage)){
      setCurrentPage(currentPage+1)
      console.log(currentPage)
    }
    
  
  }
  const acceptFunction = async (e, value)=>{
// console.log(value)
await fetch("http://localhost:8000/acceptRequest", {
  method: 'post',
  body: JSON.stringify({value}),
  headers: {
      'Content-Type': 'application/json'
  }
});
window.location.reload(true )

  }
  const rejectFunction = async  (e, value)=>{
    await fetch("http://localhost:8000/rejectRequest", {
  method: 'post',
  body: JSON.stringify({value}),
  headers: {
      'Content-Type': 'application/json'
  }
});

window.location.reload(true)
  }
  
    return(
        <div className="body">
              <div className="input">
        

    <input type="text" placeholder= "Search by Number/EmailId" value={val} onChange={filterFunction} />
    </div>
    {
      isType=== 0 || isType==2?
      <div className="table_div">
          <table className="table table1">
  <thead>
  <tr>
    <th className="table table2">Email ID</th>
    <th className="table table2">Name</th>
    <th className="table table2">Number</th>
    {/* <th className="table table2">isActive</th> */}
    <th className="table table2">Start time</th>
    <th className="table table2">End time</th>
    <th className="table table2">Status</th>
    <th className="table table2">Accept or Reject the requests</th>
  </tr>
  
  </thead>
  <tbody>
  {newData.map((value, index)=>(
        <tr key={index}>
        <td className="table">{value.email}</td>
        <td className="table">{value.name}</td>
        <td className="table">{value.number}</td>
        <td className="table">{value.from}</td>
        <td className="table">{value.to }</td>
        <td className="table"> {value.status == 0?"pending" : value.status==1 ? "accept" : "reject"} </td>
        <td className="table"><button onClick={(e)=>acceptFunction(e, value._id)} style={{border: "none", background: "none", cursor: "pointer",}}>Accept</button>/ <button onClick={(e)=>rejectFunction(e, value._id)} style={{cursor: "pointer", border: "none", background: "none"}}>Reject</button> </td>

      </tr>
  
  ))}
  </tbody>
  </table>

        </div>
        :
    <div className="table_user">
      <ul>
        {newData.map((value, index)=>(
          <div>
        <li><span style={{fontSize: "2rem"}}>Email: &nbsp;  </span>
        <span>{value.email}</span>
        </li>
        <li><span style={{fontSize: "2rem"}}>Name: &nbsp; </span>
        <span>{value.name}</span>
        </li>
        <li>
          <span style={{fontSize: "2rem"}}>Number: &nbsp;</span>
          <span>{value.number}</span>
        </li>
        <li>
          <span style={{fontSize: "2rem"}}>Start time: &nbsp;</span>
          <span>{value.from}</span>
        </li>
        <li>
          <span style={{fontSize: "2rem"}}>End time:</span >
          <span>{value.to}</span>
        </li>
        <li>
          <span style={{fontSize: "2rem"}}>Status:</span >
          { value.status == 0 ?<span>pending</span> : value.status == 1 ? <span>accept</span> : <span>reject</span> }
          {/* </div> */}
        </li>

        <br/><br/>
        </div>
        ))}
      </ul>
    </div>
}
  <div className="paginationButton1">
  <div className="paginationButton">
    <button onClick={prePage}>Previous</button>
    <button onClick={nextPage}>Next</button>
  </div>
  </div>

        </div>
    );

}
export default MyRequests;