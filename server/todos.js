const { v4: uuidv4 } = require('uuid');

// storage
const todos = {};

// functions: get, add, update and delete
const getAllToDos = (username) => {
  if(!todos[username]) { return {}; }
  return todos[username];
};

const addTodo = ({username, todo}) => {
  todos[username] = todos[username] || {};
  const todoId = uuidv4();
  todos[username][todoId] = { ...todo, todoId };
  return todos[username][todoId];
};

const updateTodo = ({ username, todoId, todo }) => {
  if(!todos[username] || !todos[username][todoId]) { return; }
  todos[username][todoId] = { ...todo, todoId };
  return todos[username][todoId];
};

const deleteTodo = ({ username, todoId }) => {
  if(!todos[username]) { return; }
  const todo = todos[username][todoId];
  delete todos[username][todoId];
  return todo;
};

module.exports = {
  getAllToDos,
  addTodo,
  updateTodo,
  deleteTodo,
};
