import React, {useState, useEffect} from 'react'
import axios from "axios";
import Loader from './Loader'



export default function NoteApp() {
  const [noteObject, setNoteObject] = useState([{}])
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')

useEffect(async () => {  
    setLoading(true)
  
    const query = `https://protected-shore-46990.herokuapp.com/notes`;
    let resp = await axios.get(query);
  
    setNoteObject(resp.data);
    setLoading(false)
  }, [])

function NoteInfo(props) {
  const [newNote, setNewNote] = useState(props.comment)
  
  if (typeof props.comment === "undefined") return <h2>Подтягиваю данные...</h2>;
 
  const delNote = async () => {

    fetch('https://protected-shore-46990.herokuapp.com/notes/del?_id=' + props._id)
    const query = `https://protected-shore-46990.herokuapp.com/notes`;
    let resp = await axios.get(query);
    setNoteObject(resp.data);
    }
  
  const chNote = () => {
   document.getElementById(props._id+"show").style.display='none'
   document.getElementById(props._id+"change").style.display='block'
   setNewNote(props.account)
  }
  const updNote = async () => {

    fetch(`https://protected-shore-46990.herokuapp.com/notes/upd?_id=` + props._id + '&comment=' + newNote)
    const query = `https://protected-shore-46990.herokuapp.com/notes`;
    let resp = await axios.get(query);
    setNoteObject(resp.data);
  }
  const styleNone = {
  display: 'none'
  }
  const handleChange = (e) => {
    setNewNote(e.target.value)
  }
  return (
      <div>
      <li id={props._id + "show"}>{props.comment} <button className="rm" onClick={delNote}>&times;</button> <button className="um" onClick={chNote}>&#10000;</button></li>
      <li id={props._id + "change"} style={styleNone}> <input value={newNote}  onChange={handleChange}></input><button onClick={updNote}>ok</button></li>
    </div>
  );
}
function NoteList(props) {
    return (
        <div className="text-start"><ul className="smile"> {props.data.map(item => <NoteInfo {...item}/>)}</ul></div>
    );
}
const handleChange1 = (e) => {
    e.preventDefault()
    setText(e.target.value)
  }
  
  const handleSubmit =  async (e) => {
      e.preventDefault();
     if (text) {
       fetch(`https://protected-shore-46990.herokuapp.com/notes/add?comment=` + text)
    
       const query = `https://protected-shore-46990.herokuapp.com/notes`;
    let resp = await axios.get(query);
    setNoteObject(resp.data);
     }else return
      
    }
    return (<>
        {loading && <Loader />}
      <NoteList data={noteObject} />
       <form onSubmit={handleSubmit}>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
            <label htmlFor="new-summ" class="input-group-text" id="basic-addon1">
            Новая заметка: 
            </label>
            </div>
            <input
              type="text"
              id="new-summ"
              onChange={handleChange1}
              value={text}
            />
            <button id='outin'>
              Добавить
                </button>
                </div>
          </form>
      </>
    );
}
