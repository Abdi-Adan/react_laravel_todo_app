import React, { useState } from 'react'


export default function EditTodoForm({ editTodo, task }) {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task.id);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todoInput" placeholder='Update task' />
      <button type="submit" className='todoBtn'>Add Task</button>
    </form>
  )
}
