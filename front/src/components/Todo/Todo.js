
import React, { useState } from 'react'
import TodoForm from './TodoForm'
import { RiCloseCircleLine, RiTimerLine } from "react-icons/ri";
import { TiEdit, TiPlus } from 'react-icons/ti'

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  })
  
  const [subTodo, setSubTodo] = useState({
    id: null,
    value: ''
  })

  const submitUpdate = value => {
    updateTodo(subTodo.id, value)
    setSubTodo({
      id: null,
      value: ''
    })
  }

  const submitUpdate2 = value => {
    updateTodo(edit.id, value)
    setEdit({
      id: null,
      value: ''
    })
  }

  if (subTodo.id) {
    return <TodoForm subTodo={subTodo} onSubmit={submitUpdate} />
  }

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate2} />
  }

  if (todos) {
    return todos.map((todo, index) => (
      <div
        // className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
        className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
        key={index} style={{cursor: 'pointer'}}
      >
        <a target="_blank" href={`/relogio/${todo.nome}`} >
          <RiTimerLine className="clock-icon" />
        </a>
        <div key={todo._id} onClick={() => completeTodo(todo._id, todo.isComplete)}>
          {todo.nome}
        </div>
        <div className="icons">
          <RiCloseCircleLine
            onClick={() => removeTodo(todo._id)}
            className="delete-icon"
          />
          <TiEdit
            onClick={() => setEdit({ id: todo._id, value: todo.nome })}
            className="edit-icon"
          />
          <a href="/sub" className="GFG">
            <TiPlus
              className="subtodo-icon"
            />
          </a>
        </div>
      </div>
    ))
  }
  return <></>
}

export default Todo