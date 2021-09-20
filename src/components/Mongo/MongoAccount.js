import React, {useState, useEffect} from 'react'
import axios from "axios";
import Loader from './Loader'



export default function AccountApp() {
  const [accObject, setAccObject] = useState([{}])
  const [loading, setLoading] = useState(true)

useEffect(async () => { 
    setLoading(true)
  
    const query = `https://protected-shore-46990.herokuapp.com/accounts`;
    let resp = await axios.get(query);
  
    setAccObject(resp.data);
    setLoading(false)
  }, [])

function AccInfo(props) {
  const [newAcc, setNewAcc] = useState(props.account)
  
  if (typeof props.account === "undefined") return <h2>Подтягиваю данные...</h2>;
 
  const delAcc = () => {

    fetch('https://protected-shore-46990.herokuapp.com/accounts/del?_id='+props._id)
       .then(window.location.reload())
     
    }
  
  const chAcc = () => {
   document.getElementById(props._id+"show").style.display='none'
   document.getElementById(props._id+"change").style.display='block'
   setNewAcc(props.account)
  }
  const updAcc =  () => {

    fetch(`https://protected-shore-46990.herokuapp.com/accounts/upd?_id=`+props._id+'&account='+newAcc)
       .then(window.location.reload())
  }
  const styleNone = {
  display: 'none'
  }
  const handleChange = (e) => {
    setNewAcc(e.target.value)
  }
  return (
      <div>
      <li id={props._id + "show"}>{props.account} <button className="rm" onClick={delAcc}>&times;</button> <button className="um" onClick={chAcc}>&#10000;</button></li>
      <li id={props._id + "change"} style={styleNone}> <input value={newAcc}  onChange={handleChange}></input><button onClick={updAcc}>ok</button></li>
    </div>
  );
}
function AccList(props) {
    return (
        <div className="text-start"><ul className="mouth"> {props.data.map(item => <AccInfo {...item}/>)}</ul></div>
    );
}

    return (
      <div className="App">
        {loading && <Loader />}
        <AccList data={accObject}/>
      </div>
    );
}
