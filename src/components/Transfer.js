import React, {useState} from 'react'
import Modal from './Modal'
import axios from 'axios'
import TransferApp from './Mongo/MongoTransfer'

const Transfer = () => {
  return (
    <React.Fragment>
      <div class="content">
              <h2>Переводы</h2>
        <div className="intocontent ">
          <Acc />
          <TransferApp/>
          </div>
      </div>
      <Modal/>
    </React.Fragment>
        )

}

class Acc extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accObject: [{}],
    }
  }
   updateAcc(acc) {
      this.setState({
        accObject: acc,
      });
    };
   
    async componentDidMount() {
    const query = `https://protected-shore-46990.herokuapp.com/accounts`;
    let resp1 = await axios.get(query);
    this.setState({ accObject: resp1.data });
      
    }
    render(){
      return (
        <div className="App">
          <Select accounts={this.state.accObject}/>
        </div>
      );
    }
  }

function Select(props) {
  const [accountOut, setAccountOut] = useState('')
  const [accountIn, setAccountIn] = useState('')
  const selAccOut = (e) => {
    e.preventDefault();
    setAccountOut(e.target.value)
    document.getElementById("noAccOut").style.display="none"
  }
   const selAccIn = (e) => {
    e.preventDefault();
    setAccountIn(e.target.value)
    document.getElementById("noAccIn").style.display="none"
}
 
  return (
    <div className="row">
             <div id="dublicateAcc" className="text-center">счета не должны совпадать</div>
      <div className="col-md-6">
             <div id="noAccOut">счёт не выбран</div>
        <div class="input-group mb-3">
             <div class="input-group-prepend">
                <label htmlFor="accountOut" className="input-group-text small" id="basic-addon1">
                Выберите счёт расхода:</label>
              </div>
          <select
            name="accountOut"
            id="select"
            class="form-select small"
            onChange={selAccOut}
            required>
              <option disabled selected value='' key="0">-- определись --</option>
              {props.accounts.map(item => 
                <option key={item.id}>
                  {item.account}
              </option>)}
            </select>
         
          </div>
        </div>
        
            <div className="col-md-6">
            <div id="noAccIn">счёт не выбран</div>
             <div class="input-group mb-3">
             <div class="input-group-prepend">
                <label htmlFor="accountIn" className="input-group-text small" id="basic-addon1">
                Выберите счёт прихода:</label>
              </div>
          <select
            name="accountIn"
            id="select"
            class="form-select small"
            onChange={selAccIn}
            required>
              <option disabled selected value='' key="0">-- определись --</option>
              {props.accounts.map(item => 
                <option key={item.id}>
                  {item.account}
              </option>)}
            </select>
          </div>
      </div>
      
            <Add accountOut={accountOut} accountIn={accountIn}/>
    </div>
    );
}


function Add({ accountOut, accountIn}) {

      const [items, setItems] = useState([])
      const [num, setNum] = useState(null)
      const [date, setDate] = useState('')
      const [sum,setSum]=useState(0)
 
   const handleChange=(e)=> {
      setNum(e.target.value);
  }
   const handleChange2=(e)=> {
      setDate(e.target.value);
  }
  
  const handleSubmit=async(e)=> {
    e.preventDefault();
    if (!accountOut) {
      document.getElementById("noAccOut").style.display = "block"
    }
    else if (!accountIn ) {
      document.getElementById("noAccIn").style.display = "block"
    }
    else if (accountOut === accountIn) {
      document.getElementById("dublicateAcc").style.display = "block"
    }
    else {
       document.getElementById("noAccOut").style.display = "none"
      document.getElementById("noAccIn").style.display = "none"
      document.getElementById("dublicateAcc").style.display = "none"
      const newItem = {
        num: num,
        date: date,
        accountOut: accountOut,
        accountIn: accountIn
      };
      setItems(items.concat(newItem))
      setDate('')
      setNum('')

  
fetch('https://protected-shore-46990.herokuapp.com/transfer/add?date='+date+"&summ="+num+"&accountOut="+accountOut+"&accountIn="+accountIn)
       .then(window.location.reload())
    
    }
 
  }

  const Summ = () => {
    if (accountOut && accountIn)
      setSum(sum + parseFloat(num))
  }
    
  return (
    
      <form onSubmit={handleSubmit} >
      <div className="row">
        <div className="col-md-6">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label htmlFor="new-summ" className="input-group-text small" id="basic-addon1">
                  Дата:
                </label>
              </div>
              <input
                type="date"
                className="form-select small"
                name="new-date"
              value={date}
               max={new Date().toISOString().split('T')[0]}
                onChange={handleChange2}
                required
              />
            </div>
          </div>
         
          <div className="col-md-6">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label htmlFor="new-summ" className="input-group-text small" id="basic-addon1">
                  Сумма:
                </label>
              </div>
              <input
                type="number"
                className="form-select small"
                name="new-cat"
                onChange={handleChange}
                value={num}
                min="0.01"
                step="0.01"
                required
              />
            </div>
          </div>
           <center><button onClick={Summ} id="outin" className="small"> 
              Добавить
          </button></center>
        </div>
      </form>
    
  );
    
    
}



export default Transfer