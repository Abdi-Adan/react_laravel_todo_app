import React, { useState } from "react";
import axiosClient from "../../axios-client.js";
import TodoForm from "./TodoForm";
import EditTodoForm from "./EditTodoForm";
import { useEffect } from "react";
import Todo from "./Todo";

export default function TodoWrapper() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = () => {
    axiosClient.get('/todo')
      .then(({ data }) => {
        setTodos([
          ...data,
        ]);
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

  const toggleComplete = (task) => {
    const payload = {
      "item": {
        id: task['id'],
        title: task['title'],
        completed: task['completed'],
      }
    }

    axiosClient.put('/todo/' + task['id'], payload)
      .then(({ data }) => {
        console.log(data)
        getTodos();
      })
      .catch(err => {
        debugger;
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

  const editTask = (value, id, completed) => {
    const newPayload = {
      "item": {
        'id': id,
        'title': value,
        'completed': completed
      }
    }

    axiosClient.put('/todo/edit/' + id, newPayload)
      .then(({ data }) => {
        console.log(data)
        getTodos();
      })
      .catch(err => {
        debugger;
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
          <EditTodoForm key={todo['id']} editTodo={editTask} task={todo} />
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
