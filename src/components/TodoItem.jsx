import {deleteTodoByID, toggleStatus} from '../store/todoSlice';
import { useDispatch } from 'react-redux';

const TodoItem=({id,title,completed})=>{
    const dispatch=useDispatch()
    return(
        <li>
            <input type='checkbox'
              checked={completed}
              onChange={()=>dispatch(toggleStatus(id))}
            />
            <span>{title}</span>
            <span onClick={()=>dispatch(deleteTodoByID(id))}>&#215;</span>
        </li>
    )
}
export default TodoItem