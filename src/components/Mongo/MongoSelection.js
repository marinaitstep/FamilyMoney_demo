import React, {useState, useEffect} from 'react'
import axios from "axios";
import Loader from './Loader'

const styleGreen = {
  backgroundColor: 'rgb(217, 255, 161)'
}
const styleOrange = {
  backgroundColor: 'rgb(250, 219, 160)'
}

export default function MongoSelection() {
  const [allObject, setAllObject] = useState([{}])
  const [loading, setLoading] = useState(false)
  
  useEffect(async () => {
    setLoading(true)
    
    const query = `https://protected-shore-46990.herokuapp.com/balance`;
    let resp = await axios.get(query);
  
    setAllObject(resp.data)
    setLoading(false)
  }, [])


function AllInfo (props) {
  if (typeof props.account === "undefined") return <h2>Подтягиваю данные...</h2>; 
   
const delSpend = async () => {
  fetch(`https://protected-shore-46990.herokuapp.com/spend/del?_id=`+props._id)
   .then(window.location.reload())
  }
const delProfit = async () => {
fetch(`https://protected-shore-46990.herokuapp.com/profit/del?_id=`+props._id)
   .then(window.location.reload())
  }

  if (props.summ.includes('-')) {
    return (
      <div>
        <li key={props._id} style={styleOrange}><b>{props.date}</b> {props.account} - {props.category} ({props.comment}): {props.summ} грн <button className="rmw" onClick={delSpend}>&times;</button></li>
      </div>
    );
  }
   if (props.summ.includes('+')) {
    return (
      <div>
        <li key={props._id} style={styleGreen}><b>{props.date}</b> {props.account} - {props.category} ({props.comment}): {props.summ} грн <button className="rmw" onClick={delProfit}>&times;</button></li>
      </div>
    );
  }
}
function AllList(props) {
    return (
      <div className="text-start cntr">
        <ul>
          {props.data.map(item => <AllInfo {...item} />)}
        </ul>
      </div>
    );
}

  return (
    <div id="MongoSelection">
      <hr />
      <h5>Последние проводки:</h5>
      {loading && <Loader />}
      <AllList data={allObject} />
    </div>
  )
}