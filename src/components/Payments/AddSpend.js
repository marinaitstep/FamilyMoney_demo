/// создание проводок
import React, { useState} from "react"
import axios from 'axios'

class AccCatOut extends React.Component {
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
      const query1 = ` https://protected-shore-46990.herokuapp.com/accounts`;
      const query2 = ` https://protected-shore-46990.herokuapp.com/categoryOut`;
      let resp1 = await axios.get(query1);
      let resp2 = await axios.get(query2);
      this.setState({ accObject: resp1.data });
      this.setState({ catObject: resp2.data });
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
  const selAcc = (e) => {
    e.preventDefault();
    setAccount(e.target.value)
    document.getElementById("noAcc").style.display="none"
}
  const selCat = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
    document.getElementById("noCat").style.display="none"
   }
  return (
    <div class="intocontent">
      <div className="row">
        
        <div className="col-md-6">
            <div id="noAcc">счёт не выбран</div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label htmlFor="account" className="input-group-text small spend" id="basic-addon1">
                Выберите счёт расхода:</label>
              </div>
          <select
            name="account"
            id="select"
            class="form-select small"
            onChange={selAcc}
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
            <div id="noCat">категория не выбрана</div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
              <label htmlFor="account" className="input-group-text small spend" id="basic-addon1">
                Выберите категорию расхода:</label>
              </div>
          <select
            name="category"
            id="select"
            class="form-select small"
            onChange={selCat}
            required
            >
            <option disabled selected value='' key="0">-- определись --</option>
              {props.categories.map(item =>
                <option key={item.id}>
                  {item.category}
                </option>)}
        </select>
        </div>
          </div>

      </div>
           <Addspend account={account} category={category} />
      </div>
    );
}


function Addspend({ account, category }) {

      const [items, setItems] = useState([])
      const [num, setNum] = useState(null)
      const [date, setDate] = useState('')
      const [comment,setComment]=useState('')
      const [sum,setSum]=useState(0)
 
   const handleChange=(e)=> {
      setNum(e.target.value);
  }
   const handleChange2=(e)=> {
      setDate(e.target.value);
  }
  const handleChange3 = (e) => {
      setComment(e.target.value);
  }
  const handleSubmit=async(e)=> {
    e.preventDefault();
    if (!account) {
      document.getElementById("noAcc").style.display = "block"
    }
    else if (!category) {
      document.getElementById("noCat").style.display = "block"
    }
    else {
      const newItem = {
        num: num,
        category: category,
        date: date,
        comment: comment,
        account: account
      };
      setItems(items.concat(newItem))
      setDate('')
      setComment('')
      setNum('')

      fetch(`https://protected-shore-46990.herokuapp.com/spend/add?category=`+category + "&date=" + date + "&summ=" + num + "&comment=" + comment + "&account="+ account)
      .then(window.location.reload())
    
    }
 
  }

  const Summ = () => {
    if (account && category)
      setSum(sum + parseFloat(num))
  }
  
  return (
       
    <div className="intocontent">
      <form onSubmit={handleSubmit} >
        <div className="row">
          <div className="col-md-3">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label htmlFor="new-summ" className="input-group-text small spend" id="basic-addon1">
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
                <label htmlFor="new-summ" class="input-group-text small spend" id="basic-addon1">
                  Комментарий:
                </label>
              </div>
              <input
                type="text"
                className="form-select small"
                name="new-date"
                value={comment}
                onChange={handleChange3}
                placeholder="необязательно"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label htmlFor="new-summ" className="input-group-text small spend" id="basic-addon1">
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
    </div>
  );
    
    
}


  export default AccCatOut;
