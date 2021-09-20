import React, { useState } from 'react'
import axios from "axios";
import Loader from './Loader'


function TransferInfo(props) {
   const [newDate, setNewDate] = useState("")
   const [newAccountSpend, setNewAccountSpend] = useState("")
   const [newAccountProfit, setNewAccountProfit] = useState("")
   const [newCategory, setNewCategory] = useState("")
   const [newComment, setNewComment] = useState("")
   const [newSumm, setNewSumm] = useState("")
  
  if (typeof props.summ === "undefined") return <h2>Подтягиваю данные...</h2>;
    const delTransfer =  () => {
     fetch('https://protected-shore-46990.herokuapp.com/transfer/del?_id='+props._id+"&date="+props.date+"&account="+props.account+"&summ="+props.summ)
       .then(window.location.reload())
  }
 
   const chTransf = () => {
   document.getElementById(props._id+"show").style.display='none'
   document.getElementById(props._id+"change").style.display='block'
     setNewDate(props.date)
     setNewAccountSpend(props.account)
     setNewAccountProfit(props.comment.slice(8))
     setNewCategory(props.category)
     setNewComment(props.comment)
     setNewSumm(props.summ.slice(1))
  }
  const updTransf =  () => {
    updSpend()
    updProfit()
  }
  const updSpend =  () => {
    fetch('https://protected-shore-46990.herokuapp.com/spend/upd?_id='+props._id+"&date="+newDate+"&account="+newAccountSpend+"&category="+newCategory+"&comment="+newComment+"&summ="+newSumm)
       .then(window.location.reload())
    
  }
  const updProfit = async () => {
     fetch('https://protected-shore-46990.herokuapp.com/profit/updt?oldDate='+props.date+"&oldAccount="+props.comment.slice(8)+"&oldCategory="+props.category+"&oldSumm="+props.summ.slice(1)+"&date="+newDate+"&account="+newAccountProfit+"&category="+newCategory+"&comment="+newComment+"&summ="+newSumm)
       .then(window.location.reload())
}

  const styleNone = {
  display: 'none'
  }
  const handleChange1 = (e) => {
    setNewDate(e.target.value)
  }
  const handleChange2 = (e) => {
    setNewAccountSpend(e.target.value)
  }
  const handleChange22 = (e) => {
    setNewAccountProfit(e.target.value)
  }
 
  const handleChange5 = (e) => {
    setNewSumm(e.target.value)
  }
    return (
      <div>
        <li id={props._id + "show"}><b>{props.date}</b> {props.account}  &#10140; {props.comment.slice(8)}: {props.summ.slice(1)} грн <button className="rm" onClick={delTransfer}>&times;</button>  <button className="um" onClick={chTransf}>&#10000;</button></li>
     <li id={props._id + "change"} style={styleNone}>
        <input value={newDate} onChange={handleChange1} type="date"  max={new Date().toISOString().split('T')[0]} required></input>
        <input value={newAccountSpend} onChange={handleChange2} required readonly="readonly"></input>
        <input value={newAccountProfit} onChange={handleChange22} required readonly="readonly"></input>
        <input value={newSumm}  onChange={handleChange5} type="number"  min="0.01" step="0.01" required></input>
          <button onClick={updTransf}>ok</button>
        </li>
      </div>
    );
  }
 
function TransferList(props) {
    return (
      <div className="text-start">
        <ul>
          {props.data.map(item => <TransferInfo {...item} />)}
        </ul>
      </div>
    );
}
export default class TransferApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transferObject: [{}], loading: false,
    }
        this.updateTransfer = this.updateTransfer.bind(this);
   }
    updateTransfer (transfer) {
    
      this.setState ({
        transferObject: transfer,
        loading: false
      });
  };

 async componentDidMount() {
    this.setState({ loading: true })
  
    const query = `https://protected-shore-46990.herokuapp.com/transfer`;
    let resp = await axios.get(query);
  
   this.setState({ transferObject: resp.data });
   this.setState({ loading: false })
  }

  render() {
    return (
      <div className="App">
        <hr/>
        <h5>Последние переводы:</h5>
        {this.state.loading && <Loader />}
        <TransferList data={this.state.transferObject} />
      </div>
    );
  }
}
