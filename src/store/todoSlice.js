import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchTodos = createAsyncThunk(
//   "todos/fetchTodos",
//   async function (_,{rejectWithValue}) {
//     try{
//         const response = await axios.get(
//             "https://jsonplaceholder.typicode.com/todos?_limit=15"
//           );
//           return response.data;
//     }catch(error){
//       return rejectWithValue(error.message)
//     }
    
//   }
// );

export const addNewTodo=createAsyncThunk(
    'todos/addNewTod',
    async function (title,{rejectWithValue, dispatch}){
        const newTodo = {         
            title,
            completed: false,
          };
        try{
            const response = await axios.post(
                "https://jsonplaceholder.typicode.com/todos", {... newTodo}
              );
            //   console.log(response.data);
              dispatch(addTodo(response.data))
        }
        catch(error){
            return rejectWithValue(error.message)
        }
    }

)

// export const deleteTodoById=createAsyncThunk(
//     'todos/deleteTodoById',
//     async function(id,{rejectWithValue,dispatch}){
//         try{ 
//             const response = await axios.delete(
//                 `https://jsonplaceholder.typicode.com/todos/${id}`
//               );
//               console.log(response);
//               dispatch(removeTodo(id))

//         } catch(error){
//             return rejectWithValue(error.message)
//         }

//     }
// )

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    setAllTodos(state, action){
      state.todos=action.payload
    },
    addTodo(state, action) {    
      state.todos = [...state.todos,action.payload ];
    },
    removeTodo(state, action) {   
      const newTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      state.todos = newTodos;
    },
    toggleStatus(state, action) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );
      toggledTodo.completed = !toggledTodo.completed;
    },
    setLoading(state,action){      
      state.status=action.payload
    }
  },
  // extraReducers:{
  //   [fetchTodos.pending]:(state)=>{
  //       state.status ='loading';
  //       state.error=null
  //   },
  //   [fetchTodos.fulfilled]:(state,action)=>{
  //       state.status ='completed';
  //       state.todos=action.payload
  //   },
  //   [fetchTodos.rejected]:(state,action)=>{
  //       state.error=action.payload;
  //       state.status='rejected'
  //   }
  // }
});

//  cоздание  асинхронных функций без createAsynkSunc
export const getTodosAsync=()=>(dispatch)=>{   
  dispatch(setLoading('loading'))
    try{
        const response = axios.get(
       "https://jsonplaceholder.typicode.com/todos?_limit=15")
       .then(res=>{
        dispatch(setAllTodos(res.data))
        dispatch(setLoading('completed')) 
       })  
             
    }
    catch(error){
        console.log(error)
        dispatch(setLoading('rejected'))
    }
}
    
export const deleteTodoByID=function(id){
  return (dispatch)=>{
    dispatch(setLoading('loading'))
     try{
      const data= axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res=>{
          console.log(res);
      });
      dispatch(removeTodo(id));
      dispatch(setLoading('completed'))         
     } catch(error){
         console.log(error)
     }
  }
}

           

export const { addTodo, removeTodo, toggleStatus,setAllTodos, setLoading} = todoSlice.actions;
export default todoSlice.reducer;
