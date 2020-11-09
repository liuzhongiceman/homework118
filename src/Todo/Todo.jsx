import React from 'react';

import './Todo.css';

export default function Item({ id, todo, onUpdate, onDelete}) {
  
  function handleDelete() { onDelete(id); }

  function toggle() { onUpdate(id, {content: todo.content, status:!todo.status}); }
  
  return (
    <li className={todo.status ? 'deleted' : ''}>
      <span>{todo.content}</span>
      <button onClick={toggle} className={(todo.status ? 'done' : 'todo')}>{todo.status ? 'Completed' : 'ToDo'}</button>
      <button onClick={handleDelete} className='delete'>Remove</button>
    </li>
  )
}
