import React, {useState} from 'react'
import axios from "axios";
import Loader from './Loader'


function SpendInfo(props) {
 const [newDate, setNewDate] = useState("")
 const [newAccount, setNewAccount] = useState("")
 const [newCategory, setNewCategory] = useState("")
 const [newComment, setNewComment] = useState("")
 const [newSumm, setNewSumm] = useState("")
 
  if (typeof props.summ === "undefined") return <h2>Подтягиваю данные...</h2>;
 
  const delSpend =  () => {
     fetch('https://protected-shore-46990.herokuapp.com/spend/del?_id='+props._id)
       .then(window.location.reload())
  }
   const chSpend = () => {
   document.getElementById(props._id+"show").style.display='none'
   document.getElementById(props._id+"change").style.display='block'
     setNewDate(props.date)
     setNewAccount(props.account)
     setNewCategory(props.category)
     setNewComment(props.comment)
     setNewSumm(props.summ.slice(1))
  }
  const updSpend =  () => {
fetch('https://protected-shore-46990.herokuapp.com/spend/upd?_id='+props._id+"&date="+newDate+"&account="+newAccount+ "&category="+newCategory+"&comment="+newComment+"&summ="+newSumm)
       .then(window.location.reload())
    
  }
  const styleNone = {
  display: 'none'
  }
  const handleChange1 = (e) => {
    setNewDate(e.target.value)
  }
  const handleChange2 = (e) => {
    setNewAccount(e.target.value)
  }
  const handleChange3 = (e) => {
    setNewCategory(e.target.value)
  }
  const handleChange4 = (e) => {
    setNewComment(e.target.value)
  }
  const handleChange5 = (e) => {
    setNewSumm(e.target.value)
  }
 
  return ( 
      <div>
      <li id={props._id + "show"} key={props._id}><b>{props.date}</b> {props.account} - {props.category} ({props.comment}): {props.summ} грн <button className="rm" onClick={delSpend}>&times;</button>  <button className="um" onClick={chSpend}>&#10000;</button></li>
      <li id={props._id + "change"} style={styleNone}>
        <input value={newDate} onChange={handleChange1} type="date"  max={new Date().toISOString().split('T')[0]} required></input>
        <input value={newAccount} onChange={handleChange2} required readonly="readonly"></input>
        <input value={newCategory} onChange={handleChange3} required readonly="readonly"></input>
        <input value={newComment} onChange={handleChange4}></input>
        <input value={newSumm}  onChange={handleChange5} type="number" min="0.01" step="0.01" required></input>
        <button onClick={updSpend}>ok</button></li> </div>
  );
}
function SpendList(props) {
    return (
        <div className="text-start"><ul> {props.data.map(item => <SpendInfo {...item}/>)}</ul></div>
    );
}
export default class SpendApp extends React.Component{
constructor(props) {
  super(props)
  this.state = {
  spendObject: ([{}]), loading: false,
}
this.updateSpend = this.updateSpend.bind(this);
}
  updateSpend (spend) {
  this.setState({
    spendObject: spend,
      loading: false
      });
};
 
 async componentDidMount() {
    this.setState({ loading: true })
  
    const query = `https://protected-shore-46990.herokuapp.com/spend`;
    let resp = await axios.get(query);
  
   this.setState({ spendObject: resp.data });
   this.setState({ loading: false })
  }

  
render(){
  return (
    <div className="App">
       <hr/>
        <h5>Последние проводки:</h5>
      {this.state.loading && <Loader />}
      <SpendList data={this.state.spendObject} />
    </div>
  );
}
}
