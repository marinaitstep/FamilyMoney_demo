import React, {useState} from "react"
import Modal from './Modal'
import AccountApp from './Mongo/MongoAccount'

  export default function Accounts () {
    const[text, setText] = useState('')
   const handleSubmit =  (e) => {
      e.preventDefault();
     if (text) {
    fetch(`https://protected-shore-46990.herokuapp.com/accounts/add?account=` + text)
      .then(window.location.reload())
     }else return
      
    }
  const handleChange = (e) => {
    e.preventDefault()
    setText(e.target.value)
    }
    return (
        <React.Fragment>
            <div class="content">
      <div class="intocontent">
            <AccountApp />
          <form onSubmit={handleSubmit}>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
            <label htmlFor="new-summ" class="input-group-text" id="basic-addon1">
            Новый счёт: 
            </label>
            </div>
            <input
              type="text"
              id="new-summ"
              onChange={handleChange}
              value={text}
            />
            <button id='outin'>
              Добавить
                </button>
                </div>
          </form>
                </div>
        </div>
        <Modal/>
            </React.Fragment>
            );
    }



