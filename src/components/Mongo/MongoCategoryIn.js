import React, {useState, useEffect} from 'react'
import axios from "axios";
import Loader from './Loader'



export default function CategoryIn() {
  const [сatObject, setCatObject] = useState([{}])
  const [loading, setLoading] = useState(true)

useEffect(async () => {
    setLoading(true)
  
    const query = `https://protected-shore-46990.herokuapp.com/categoryIn`;
    let resp = await axios.get(query);
  
    setCatObject(resp.data);
    setLoading(false)
  }, [])

function CatInfo(props) {
  const [newCat, setNewCat] = useState(props.category)
  
  if (typeof props.category === "undefined") return <h2>Подтягиваю данные...</h2>;
 
  const delCat = () => {

    fetch('https://protected-shore-46990.herokuapp.com/categoryIn/del?_id='+props._id)
       .then(window.location.reload())
     
    }
  
  const chCat = () => {
   document.getElementById(props._id+"show").style.display='none'
   document.getElementById(props._id+"change").style.display='block'
   setNewCat(props.сategory)
  }
  const updCat =  () => {

    fetch(`https://protected-shore-46990.herokuapp.com/categoryIn/upd?_id=`+props._id+'&category='+newCat)
       .then(window.location.reload())
  }
  const styleNone = {
  display: 'none'
  }
  const handleChange = (e) => {
    setNewCat(e.target.value)
  }
  return (
      <div>
      <li id={props._id + "show"}>{props.category} <button className="rm" onClick={delCat}>&times;</button> <button className="um" onClick={chCat}>&#10000;</button></li>
      <li id={props._id + "change"} style={styleNone}> <input value={newCat}  onChange={handleChange}></input><button onClick={updCat}>ok</button></li>
    </div>
  );
}
function CatList(props) {
    return (
        <div className="text-start"><ul className="ears"> {props.data.map(item => <CatInfo {...item}/>)}</ul></div>
    );
}

    return (
      <div className="App">
        {loading && <Loader />}
        <CatList data={сatObject}/>
      </div>
    );
}
