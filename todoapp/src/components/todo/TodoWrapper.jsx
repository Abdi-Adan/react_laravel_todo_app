import React, { useState } from "react";
import axiosClient from "../../axios-client.js";
import TodoForm from "./TodoForm";
import EditTodoForm from "./EditTodoForm";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";

export default function TodoWrapper() {
  const [setUser] = useState([]);
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    const payload = {
      title: todo.name,
      completed: false,
    }

    axiosClient.post('/todo', payload)
      .then(({ data }) => {
        console.log(data)
        debugger;
        setUser(data.user)
        setTodos([
          ...todos,
          { id: uuidv4(), title: todo.title, completed: false, isEditing: false },
        ]);
      })
      .catch(err => {
        const response = err.response.data;
        console.log(response)
        debugger;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  // const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  // const toggleComplete = (id) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //     )
  //   );
  // }

  // const editTodo = (id) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
  //     )
  //   );
  // }

  // const editTask = (task, id) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
  //     )
  //   );
  // };

  return (
    <div className="TodoWrapper">
      <h1 className="todoTitlehint">Your Task Tracker. Stay Productive.</h1>


      <TodoForm addTodo={addTodo} />

      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
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
