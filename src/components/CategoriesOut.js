import React, {useState} from "react"

import CategoryOut from './Mongo/MongoCategoryOut'

  export default function CatIn () {
    const[text, setText] = useState('')
   const handleSubmit =  (e) => {
      e.preventDefault();
     if (text) {
    fetch(`https://protected-shore-46990.herokuapp.com/categoryOut/add?category=` + text)
      .then(window.location.reload())
     }else return
      
    }
  const handleChange = (e) => {
    e.preventDefault()
    setText(e.target.value)
    }
    return (
        <React.Fragment>
          
            <CategoryOut />
          <form onSubmit={handleSubmit}>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
            <label htmlFor="new-summ" class="input-group-text" id="basic-addon1">
            Новая категория расхода: 
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

