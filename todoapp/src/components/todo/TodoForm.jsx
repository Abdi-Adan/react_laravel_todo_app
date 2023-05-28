import React, { useState } from 'react'

export default function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      addTodo(value);
      setValue('');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todoInput" placeholder='What is the task today?' />
      <button type="submit" className='todoBtn'>Add Task</button>
    </form>
  )
}
