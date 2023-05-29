import React, { useState } from 'react'
import Toast from './toast';

export default function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');
  const [notification, _setNotification] = useState();

  const setNotification = (message) => {
    _setNotification(message);
    setTimeout(() => {
      _setNotification('')
    }, 5000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      addTodo(value);
      setValue('');
    } else {
      setNotification('Error: You need to add a todo title!');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      {notification &&

        <Toast body={notification} />
      }
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todoInput" placeholder='Add new task?' />
      <button type="submit" className='todoBtn'>Add Task</button>
    </form>
  )
}
