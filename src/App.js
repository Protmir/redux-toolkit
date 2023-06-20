import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react';
import {fetchTodos, getTodosAsync} from './store/todoSlice'


function App() {
const {todos, error, status}=useSelector(store=>store.todos);
const dispatch=useDispatch()

useEffect(()=>{
    dispatch(getTodosAsync())
},[dispatch])

  return (
    <div className="App">
         <TodoForm/>
         {status==='loading'&& <h2>LOADING</h2>}
         {error && <h2>something wrong, error:{error}</h2>}
         <TodoList todos={todos}/>
    </div>
  );
}

export default App;
