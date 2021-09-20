import React from 'react'
import axios from "axios";
import Loader from './Loader'



class AccountApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        accObject: [{}],
        sumProfit: 0,
        sumSpend: 0,
        sumEach:[],
        sumAll:0,
      loading: true,
    }
   }
     
  
  async componentDidMount() {
    this.setState({ loading: true })
  
    const queryAccount = `https://protected-shore-46990.herokuapp.com/accounts`
    let respAccount = await axios.get(queryAccount)
      this.setState({ accObject: respAccount.data })
   
      for (let i = 0; i < respAccount.data.length; i++)
      {
        const queryProfit = `https://protected-shore-46990.herokuapp.com/profit/a?account=`+respAccount.data[i].account;
        let respProfit = await axios.get(queryProfit);
          for (let y = 0; y < respProfit.data.length; y++) {
                  this.setState({ sumProfit: parseFloat(this.state.sumProfit) + parseFloat(respProfit.data[y].summ.slice(1)) })
          }

        const querySpend = `https://protected-shore-46990.herokuapp.com/spend/a?account=`+respAccount.data[i].account;
        let respSpend = await axios.get(querySpend);
          for (let j = 0; j < respSpend.data.length; j++) {
                  this.setState({ sumSpend: parseFloat(this.state.sumSpend) + parseFloat(respSpend.data[j].summ.slice(1)) })
          }
          this.setState({ sumAll: this.state.sumAll+( this.state.sumProfit - this.state.sumSpend) })
          this.setState({
              sumEach: [this.state.sumEach, respAccount.data[i].account = respAccount.data[i].account +": "+ (this.state.sumProfit - this.state.sumSpend)]
          })
          this.setState({sumProfit:0})
          this.setState({sumSpend:0})
        }


    this.setState({ loading: false })
  }
 
  render() {
    return (
      <div className="App">
        {this.state.loading && <Loader />}
            <AccList data={this.state.accObject} summAll={this.state.sumAll} summEach={this.state.sumEach} />
      </div>
    );
  }
}

function AccList(props) {
        return (
            <div className="text-start"><ul> {props.data.map(item => <AccInfo {...item} />)}
            </ul>
             
                <b><center>Итого: {props.summAll}</center></b>
            </div>
        );
}

function AccInfo(props) {
  if (typeof props.account === "undefined") return <h2>Подтягиваю данные...</h2>;
  return (
      <div>
          <li>{props.account}</li>
    </div>
  );
}

export default function MongoBalance() {
    return<><AccountApp/></>
}