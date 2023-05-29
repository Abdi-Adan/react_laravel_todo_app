import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'


export default function Todo({ task, deleteTodo, editTodo, toggleComplete }) {

  return (
    <div className='TodoTile'>
      <div className="Todo" onClick={() => toggleComplete(task)}>
        <p id={`${task["id"]}`} className={`${(task['completed'] == 1) ? 'completed' : "notCompleted"}`}>
          <FontAwesomeIcon className='iconPadding' icon={faList} />
          {task['title']}
        </p>

      </div>
      <div>
        <FontAwesomeIcon className='actionIconPadding' icon={faPenToSquare} onClick={() => editTodo(task['id'])} />
        <FontAwesomeIcon className='actionIconPadding' icon={faTrash} onClick={() => deleteTodo(task['id'])} />
      </div>
    </div>
  )
}
