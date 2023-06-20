
import {useState} from 'react'; 
import { useDispatch } from 'react-redux';
import { addNewTodo } from '../store/todoSlice';

const TodoForm=()=>{
    const [text,setText]=useState('')  
    const dispatch=useDispatch()

  const handleAddTodo=()=>{
    if(text.trim().length) {
        dispatch(addNewTodo(text))
        setText('')
    }
  }
    return (
        <label>
            <input type='test'
            value={text}             
            onChange={(e)=>setText(e.target.value)}
            />            
            <button onClick={handleAddTodo}>Add Todo</button>
        </label>
    )
}
export default TodoForm