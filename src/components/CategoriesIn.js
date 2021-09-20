import React, {useState} from "react"

import CategoryIn from './Mongo/MongoCategoryIn'

  export default function CatIn () { 
    const[text, setText] = useState('')
   const handleSubmit =  (e) => {
      e.preventDefault();
     if (text) {
    fetch(`https://protected-shore-46990.herokuapp.com/categoryIn/add?category=` + text)
      .then(window.location.reload())
     }else return
      
    }
  const handleChange = (e) => {
    e.preventDefault()
    setText(e.target.value)
    }
    return (
        <React.Fragment>
          
            <CategoryIn />
          <form onSubmit={handleSubmit}>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
            <label htmlFor="new-summ" class="input-group-text" id="basic-addon1">
            Новая категория прихода: 
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
              
            </React.Fragment>
            );
    }

