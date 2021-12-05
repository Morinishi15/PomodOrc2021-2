import React, { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import axios from 'axios'
import {BASE_API_URL} from "../../config/app_config"

function TodoList() {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios.get(BASE_API_URL)
      .then(function (response) {
        // handle success
        console.log(response);
        setTodos(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

  }, [])

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return
    }

    axios.post(BASE_API_URL, {
      nome: todo.text
    }).then(function (response) {
      // handle success
      console.log(response);

      const newTodos = [response.data, ...todos]

      setTodos(newTodos)

      // setTodos(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

    
  }

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return
    }
    axios.put(`${BASE_API_URL}/${todoId}`, {nome : newValue.text})
      .then(function (response) {
        // setTodos(prev => prev.map(item => (item._id === todoId ? newValue.text : item)))
        window.location.reload();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

  }

  const removeTodo = id => {

    axios.delete(`${BASE_API_URL}/${id}`)
      .then(function (response) {
        // handle success
        console.log(response);

        const removeArr = [...todos].filter(todo => todo._id !== id)

        setTodos(removeArr)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  const completeTodo = (id, isCompleteParam) => {
    console.log(id, isCompleteParam);
    axios.put(`${BASE_API_URL}/iscomplete/${id}`, {isComplete : !isCompleteParam})
      .then(function (response) {
        // handle success
        console.log(response);

        let updatedTodos = todos.map(todo => {
          if (todo._id === id) {
            todo.isComplete = response.data.isComplete
          }
          return todo
        })
        setTodos(updatedTodos)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  return (
    <div className="task-title">
      <h1>Tarefas do Dia</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  )
}

export default TodoList