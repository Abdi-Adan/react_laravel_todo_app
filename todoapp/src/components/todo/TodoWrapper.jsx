import React, { useState } from "react";
import axiosClient from "../../axios-client.js";
import TodoForm from "./TodoForm";
import EditTodoForm from "./EditTodoForm";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";

export default function TodoWrapper() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = () => {
    axiosClient.get('/todo')
      .then(({ data }) => {
        console.log(data.data)
        setTodos([
          ...data,
        ]);
        console.log(todos);
      })
  }

  const addTodo = (todo) => {
    const payload = {
      "item": {
        title: todo,
      }
    }

    axiosClient.post('/todo/add', payload)
      .then(({ data }) => {
        console.log(data)
        getTodos();
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  const deleteTodo = (id) => {
    axiosClient.delete('/todo/' + id)
      .then(({ data }) => {
        console.log(data)
        getTodos();
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  const toggleComplete = (id) => {
    axiosClient.put('/todo/' + id)
      .then(({ data }) => {
        console.log(data)
        getTodos();
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
    const newPayload = {
      "item": {
        'title': task,
      }
    }

    axiosClient.put('/todo/' + id, newPayload)
      .then(({ data }) => {
        console.log(data)
        debugger;
        getTodos();
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  };

  return (
    <div className="TodoWrapper">
      <h1 className="todoTitlehint">Your Task Tracker. Stay Productive.</h1>

      <TodoForm addTodo={addTodo} />

      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo['id']}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
