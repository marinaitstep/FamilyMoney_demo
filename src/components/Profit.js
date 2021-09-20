import React from 'react'
import AccCatIn from "./Payments/AddProfit";
import Modal from './Modal'
import ProfitApp from './Mongo/MongoProfit'

const Profit = ({ user }) => {
  
  return (
    <React.Fragment>
      <div class="content">
        <h2>Доходы</h2>
        
        <AccCatIn/>
       <ProfitApp/>
      </div>
      <Modal/>
    </React.Fragment>
        )

}


export default Profit