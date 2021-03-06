import React, {useState, useEffect} from 'react'
import Modal from './Modal'
import axios from 'axios'
import MongoBalance from './Mongo/MongoBalance'
import MongoSelection from './Mongo/MongoSelection'
import Loader from './Mongo/Loader'


const styleGreen = {
  backgroundColor: 'rgb(217, 255, 161)'
}
const styleOrange = {
  backgroundColor: 'rgb(250, 219, 160)'
}

class AccCat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accObject: [{}],
      catObject: [{}],
    }
  }
   updateAcc(acc) {
      this.setState({
        accObject: acc,
      });
    };
    updateCat(cat) {
      this.setState({
        catObject: cat,
      });
    };
  
    async componentDidMount() {
      const query1 = `https://protected-shore-46990.herokuapp.com/accounts`;
      const query2 = `https://protected-shore-46990.herokuapp.com/categoryIn`;
      const query3 = `https://protected-shore-46990.herokuapp.com/categoryOut`;
      let resp1 = await axios.get(query1);
      let resp2 = await axios.get(query2);
      let resp3 = await axios.get(query3);
      this.setState({ accObject: resp1.data });
      this.setState({ catObject: resp2.data.concat(resp3.data) });
    }
    render(){
      return (
        <div className="App">
          <Select accounts={this.state.accObject} categories={this.state.catObject}/>
        </div>
      );
    } 
  }

function Select(props) {
  const [category, setCategory] = useState('')
  const [account, setAccount] = useState('')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const selAcc = (e) => {
    e.preventDefault();
    setAccount(e.target.value)
}
  const selCat = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  }
  const handleDateStart = (e) => {
    e.preventDefault();
    setDateStart(e.target.value);
  }
  const handleDateEnd = (e) => {
    e.preventDefault();
    setDateEnd(e.target.value);
  }
  
  return (
    <div class="intocontent">
      <div className="row justify-content-center cntr">
        
        <div className="col-md-6">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label htmlFor="account" className="input-group-text small" id="basic-addon1">
                ???????????????? ????????:</label>
              </div>
          <select
            name="account"
            id="select"
            class="form-select small"
            onChange={selAcc}
            >
              <option selected value='' key="0">-- ?????? --</option>
              {props.accounts.map(item => 
                <option key={item.id}>
                  {item.account}
              </option>)}
            </select>
          </div>
        </div>
        

        <div className="col-md-6">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
              <label htmlFor="account" className="input-group-text small" id="basic-addon1">
                ???????????????? ??????????????????:</label>
              </div>
          <select
            name="category"
            id="select"
            class="form-select small"
            onChange={selCat}
            >
              <option selected value='' key="0">-- ?????? --</option>
               <option>????????????</option>
               <option>??????????????</option>
              <option>????????????????</option>
              {props.categories.map(item =>
                <option key={item.id}>
                  {item.category}
                </option>)}
            </select>
          </div>
        </div>
        
        <div id="incorrect" className="text-center">?????????? ?????????????? ???? ???????????? ???????? ???????????? ????????????!</div>
            <div className="col-md-6">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label htmlFor="new-summ" className="input-group-text small" id="basic-addon1">
                  ???????????? ??????????????:
                </label>
              </div>
              <input
                type="date"
                className="form-select small"
                name="new-date"
              value={dateStart}
              max={new Date().toISOString().split('T')[0]}
                onChange={handleDateStart}
              />
            </div>
          </div>
        

        
        <div className="col-md-6">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label htmlFor="new-summ" className="input-group-text small" id="basic-addon1">
                  ?????????? ??????????????:
                </label>
              </div>
              <input
                type="date"
                className="form-select small"
                name="new-date"
              value={dateEnd}
              max={new Date().toISOString().split('T')[0]}
                onChange={handleDateEnd}
              />
            </div>
          </div>
        <Choice account={account} category={category} dateStart={dateStart} dateEnd={dateEnd}/>
      </div>
      </div>
    );
}

function Choice ({account, category, dateStart, dateEnd}) {
 
      const [loading, setLoading] = useState(false)
      const [paymentObj, setPaymentObj] = useState([{}])
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dateStart && dateEnd && dateStart > dateEnd)
      document.getElementById("incorrect").style.display = "block"
    else {
      document.getElementById("incorrect").style.display = "none"
      if (category === "????????????")
      {
        let respP;
        setLoading(true)
        if (!dateStart && !dateEnd && !account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/profit/`;
         respP = await axios.get(query);
        }
        if (dateStart && !dateEnd && !account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/profit/s?dateStart=` + dateStart;
         respP = await axios.get(query);
        }
        if (!dateStart && dateEnd && !account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/profit/e?dateEnd=` + dateEnd;
         respP = await axios.get(query);
        }
        if (!dateStart && !dateEnd && account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/profit/a?account=` + account;
         respP = await axios.get(query);
        }
        if (dateStart && dateEnd && !account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/profit/se?dateStart=` + dateStart + '&dateEnd=' + dateEnd;
         respP = await axios.get(query);
        }
        if (dateStart && !dateEnd && account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/profit/sa?dateStart=` + dateStart + '&account=' + account;
         respP = await axios.get(query);
        }
        if (!dateStart && dateEnd && account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/profit/ea?dateEnd=` + dateEnd + '&account=' + account;
         respP = await axios.get(query);
        }
        if (dateStart && dateEnd && account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/profit/sea?dateStart=` + dateStart + '&dateEnd=' + dateEnd + '&account=' + account;
         respP = await axios.get(query);
        }
    
      if (respP.data.length > 0) {
        document.getElementById("nothing").style.display = "none"
        setPaymentObj(respP.data)
        setLoading(false)
        if (document.getElementById("MongoSelection"))
           document.getElementById("MongoSelection").style.display = "none"
      }
      else {
        document.getElementById("nothing").style.display = "block"
        setPaymentObj([{}])
        setLoading(false)
      }
        }
      
      if (category === "??????????????")
      {
        let respS
        setLoading(true)
         if (!dateStart && !dateEnd && !account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/spend/`;
         respS = await axios.get(query);
        }
        if (dateStart && !dateEnd && !account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/spend/s?dateStart=` + dateStart;
         respS = await axios.get(query);
        }
        if (!dateStart && dateEnd && !account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/spend/e?dateEnd=` + dateEnd;
         respS = await axios.get(query);
        }
        if (!dateStart && !dateEnd && account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/spend/a?account=` + account;
         respS = await axios.get(query);
        }
        if (dateStart && dateEnd && !account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/spend/se?dateStart=` + dateStart + '&dateEnd=' + dateEnd;
         respS = await axios.get(query);
        }
        if (dateStart && !dateEnd && account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/spend/sa?dateStart=` + dateStart + '&account=' + account;
         respS = await axios.get(query);
        }
        if (!dateStart && dateEnd && account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/spend/ea?dateEnd=` + dateEnd + '&account=' + account;
         respS = await axios.get(query);
        }
        if (dateStart && dateEnd && account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/spend/sea?dateStart=` + dateStart + '&dateEnd=' + dateEnd + '&account=' + account;
         respS = await axios.get(query);
        }
      if (respS.data.length > 0) {
        document.getElementById("nothing").style.display = "none"
        setPaymentObj(respS.data)
        setLoading(false)
        if (document.getElementById("MongoSelection"))
            document.getElementById("MongoSelection").style.display = "none"
      }
      else {
        document.getElementById("nothing").style.display = "block"
        setPaymentObj([{}])
        setLoading(false)
      }
        }
      
      if (category === "????????????????")
      {
        let respT
        setLoading(true)
     if (!dateStart && !dateEnd && !account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/transfer/`;
         respT = await axios.get(query);
        }
        if (dateStart && !dateEnd && !account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/transfer/s?dateStart=` + dateStart;
         respT = await axios.get(query);
        }
        if (!dateStart && dateEnd && !account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/transfer/e?dateEnd=` + dateEnd;
         respT = await axios.get(query);
        }
        if (!dateStart && !dateEnd && account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/transfer/a?account=` + account;
         respT = await axios.get(query);
        }
        if (dateStart && dateEnd && !account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/transfer/se?dateStart=` + dateStart + '&dateEnd=' + dateEnd;
         respT = await axios.get(query);
        }
        if (dateStart && !dateEnd && account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/transfer/sa?dateStart=` + dateStart + '&account=' + account;
         respT = await axios.get(query);
        }
        if (!dateStart && dateEnd && account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/transfer/ea?dateEnd=` + dateEnd + '&account=' + account;
         respT = await axios.get(query);
        }
        if (dateStart && dateEnd && account) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/transfer/sea?dateStart=` + dateStart + '&dateEnd=' + dateEnd + '&account=' + account;
         respT = await axios.get(query);
        }
      if (respT.data.length > 0) {
        document.getElementById("nothing").style.display = "none"
        setPaymentObj(respT.data)
        setLoading(false)
        if (document.getElementById("MongoSelection"))
             document.getElementById("MongoSelection").style.display = "none"
      }
      else {
        document.getElementById("nothing").style.display = "block"
        setPaymentObj([{}])
        setLoading(false)
      }
        }  
      
        
      if (category !== "????????????????" && category !== "????????????" && category !== "??????????????") {
        setLoading(true)
        let respA
         if (!dateStart && !dateEnd && !account && !category) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/all/`;
         respA = await axios.get(query);
        }
        if (dateStart && !dateEnd && !account && !category) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/all/s?dateStart=` + dateStart;
         respA = await axios.get(query);
        }
        if (!dateStart && dateEnd && !account && !category) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/all/e?dateEnd=` + dateEnd;
         respA = await axios.get(query);
        }
        if (!dateStart && !dateEnd && account && !category) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/all/a?account=` + account;
         respA = await axios.get(query);
        }
         if (!dateStart && !dateEnd && !account && category) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/all/c?category=` + category;
         respA = await axios.get(query);
        }
        if (dateStart && dateEnd && !account && !category) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/all/se?dateStart=` + dateStart + '&dateEnd=' + dateEnd;
         respA = await axios.get(query);
        }
        if (dateStart && !dateEnd && !account && category) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/all/sc?dateStart=` + dateStart + '&category=' + category;
         respA = await axios.get(query);
        }
        if (dateStart && !dateEnd && account && !category) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/all/sa?dateStart=` + dateStart + '&account=' + account;
         respA = await axios.get(query);
        }
        if (!dateStart && dateEnd && account && !category) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/all/ea?dateEnd=` + dateEnd + '&account=' + account;
         respA = await axios.get(query);
        }
         if (!dateStart && !dateEnd && account && category) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/all/ca?category=` + category + '&account=' + account;
         respA = await axios.get(query);
        }
        if (dateStart && dateEnd && account && !category) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/all/sea?dateStart=` + dateStart + '&dateEnd=' + dateEnd + '&account=' + account;
         respA = await axios.get(query);
        }
        if (dateStart && !dateEnd && account && category) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/all/sac?dateStart=` + dateStart + '&category=' + category + '&account=' + account;
         respA = await axios.get(query);
        }
        if (!dateStart && dateEnd && account && category) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/all/eac?dateEnd=` + dateEnd + '&category=' + category + '&account=' + account;
         respA = await axios.get(query);
        }
        if (dateStart && dateEnd && account && category) {
          const query = `https://protected-shore-46990.herokuapp.com/balance/all/seac?dateEnd=` + dateEnd + '&dateStart=' + dateStart + '&category=' + category + '&account=' + account;
         respA = await axios.get(query);
        }
    
        if (respA.data.length > 0) {
          document.getElementById("nothing").style.display = "none"
          setPaymentObj(respA.data)
          setLoading(false)
          if (document.getElementById("MongoSelection"))
             document.getElementById("MongoSelection").style.display = "none"
        }
        else {
          document.getElementById("nothing").style.display = "block"
          setPaymentObj([{}])
          setLoading(false)
        }
      }
    }
  }

  return <div className="intocontent">
      <form onSubmit={handleSubmit}>
      <center><button id="outin" className="small" >
        <img src="../img/monkey.png" width="40px" alt="notfound" />
       
        
      </button></center>
       <div id="nothing" className="text-center">???????????? ???? ??????????!</div>
      {loading && <Loader />}
      <PaymentList data={paymentObj} />
      </form>
    </div>
  }

function PaymentList(props) {
    return (
      <div className="text-start">
        <ul>
          {props.data.map(item => <PaymentInfo {...item} />)}
        </ul>
      </div>
    );
}

function PaymentInfo(props) {
  if (typeof props.summ === "undefined") return <h5 className="text-center">?????? ????????????...</h5>;
 const delSpend = async () => {
    const query = `https://protected-shore-46990.herokuapp.com/spend/del?_id=`+props._id;
        await axios.get(query);
    window.location.reload()
  }
const delProfit = async () => {
  const query = `https://protected-shore-46990.herokuapp.com/profit/del?_id=`+props._id;
        await axios.get(query);
    window.location.reload()
   
  }

 if (props.summ.includes('-')) {
    return (
      <div>
        <li key={props._id} style={styleOrange}><b>{props.date}</b> {props.account} - {props.category} ({props.comment}): {props.summ} ?????? <button className="rmw" onClick={delSpend}>&times;</button></li>
      </div>
    );
  }
   if (props.summ.includes('+')) {
    return (
      <div>
        <li key={props._id} style={styleGreen}><b>{props.date}</b> {props.account} - {props.category} ({props.comment}): {props.summ} ?????? <button className="rmw" onClick={delProfit}>&times;</button></li>
      </div>
    );
  }
}


const Balance = () => {
   
  return (
    <React.Fragment>

      <div class="content">
              <h2>????????????</h2>
        <div className="row intocontent" id="balanceMain">
          <center><h3>?????????????? ?????????????? ???? ????????????:</h3></center>
          <hr />
        <MongoBalance/>
          
          <ul>
          </ul>
        </div>
        <hr/>
        <h3>?????????????? ??????????????:</h3>
        <AccCat /> {/*?????????? ?? ?????????????????? */}
         <MongoSelection/> {/*?????????????????? ???????????????? ?? ???????????????? */}
        </div> 
        <Modal/>
    </React.Fragment>
    
        )

}



export default Balance
