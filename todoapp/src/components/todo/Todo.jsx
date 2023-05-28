import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'


export default function Todo({ task, deleteTodo, editTodo, toggleComplete }) {

  return (
    <div className="Todo">
      <p className={`${task['completed'] ? '' : "completed"}`} onClick={() => toggleComplete(task['id'])}>
        <FontAwesomeIcon className='iconPadding' icon={faList} onClick={() => editTodo(task['id'])} />
        {task['title']}
      </p>
      <div>
        <FontAwesomeIcon className='iconPadding' icon={faPenToSquare} onClick={() => editTodo(task['id'])} />
        <FontAwesomeIcon className='iconPadding' icon={faTrash} onClick={() => deleteTodo(task['id'])} />
      </div>
    </div>
  )
}
