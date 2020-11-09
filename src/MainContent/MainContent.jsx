import React,  { useState, useEffect } from 'react';
import Todo from '../Todo/Todo';
import './MainContent.css';

const services = require('../services');

export default function Main({onLogout, username}) {

  const [todos, setTodos] = useState({});
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    services.getTodos(username)
      .then((res) => {
        if (res.data) { setTodos(res.data);}
      })
      .catch((e) => { console.log(e.status)});
  }, []);

  const onAdd = () => {
    if (!newTodo) { return; }
    services.addTodo({ username, todo: newTodo })
      .catch((e) => { console.log(e.status) })
      .then((res) => {
        if (res.data && res.data.todoId) {
          setTodos({ ...todos, [res.data.todoId]: res.data });
          setNewTodo('');
        }
      })
      .catch(e => console.log(e.status));
  }

  function onDelete(id) {
    services.deleteTodo({ username, todoId: id })
      .then((res) => {
        const deletedId = res.data.todoId;
        delete todos[deletedId];
        setTodos({ ...todos });
      })
      .catch(e => console.log(e.status));
  }

  function onUpdate(editingTodoId, todo) {
    const todoId = editingTodoId;
    services.updateTodo({ username, todoId, todo })
      .catch((err) => { console.log(err.status) })
      .then((res) => {
        setTodos({ ...todos, [res.data.todoId]: res.data });
      });
  }

  function logout() {
    services.logout()
      .then(() => { onLogout();})
  }
  
  const listContent = Object.keys(todos).length === 0
    ? ''
    : <ul>
        {Object.keys(todos).map((key) =>
          <Todo key={key} id={key} todo={todos[key]} onUpdate={onUpdate} onDelete={onDelete} />
        )}
      </ul>
    ;

  return (
    <div className="content">
      <button onClick={logout}>Sign Out</button>
      <div>
        <input onChange={(e) => setNewTodo(e.target.value)} value={newTodo}/>
        <button onClick={onAdd}>Add Todo</button>
      </div>
      {listContent}
    </div>
  )
}

