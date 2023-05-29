import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'


export default function Todo({ task, deleteTodo, editTodo, toggleComplete }) {

  return (
    <div className="Todo">
      <p id={`${task["id"]}`} className={`${(task['completed'] == 1) ? 'completed' : "notCompleted"}`} onClick={() => toggleComplete(task)}>
        <FontAwesomeIcon className='iconPadding' icon={faList} />
        {task['title']}
      </p>

      <div>
        <FontAwesomeIcon className='actionIconPadding' icon={faPenToSquare} onClick={() => editTodo(task['id'])} />
        <FontAwesomeIcon className='actionIconPadding' icon={faTrash} onClick={() => deleteTodo(task['id'])} />
      </div>
    </div>
  )
}
