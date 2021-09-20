import React from 'react'
import AccCatOut from "./Payments/AddSpend";
import Modal from './Modal'
import SpendApp from './Mongo/MongoSpend'

const Spend = () => {
  
  return (
    <React.Fragment>
      <div class="content">
        <h2>Траты</h2>
        <AccCatOut />
       <SpendApp/>
      </div>
      <Modal/>
    </React.Fragment>
        )

}


export default Spend