const session = require('../session');
const todos = require('../todos');

const response = (res) => {
  return ({ status, data }={}) => {
    if(!data) { data = 'OK'; }
    res.status(status || 200).json({ data });
  };
};

const routes = {
  session: { },
  todos: {
    one: {},
    all: {},
  },
};

// Session
routes.session.create = ( req, res ) => {
  const username = req.body.username;
  const createUser = session.createUser(username);
  if(!createUser) {
    response(res)({ status: 403});
    return;
  }
  res.cookie('sid', createUser.sid );
  response(res)({data: session});
};

routes.session.status = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    response(res)({status: 401});
    return;
  }
  response(res)();
};

routes.session.deleteUser = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    response(res)({status: 401});
  }
  res.clearCookie('sid');
  session.deleteUser(sid);
  response(res)();
};

// todos
routes.todos.all.read = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    response(res)({status: 401});
    return;
  }
  const username = req.params.username;
  const userExist = session.checkUserExist({ sid, username });
  if(!userExist) {
    response(res)({status: 403});
    return;
  }
  response(res)({ data: todos.getAllToDos(username) } );
};

routes.todos.one.add = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    response(res)({status: 401});
    return;
  }
  const username = req.params.username;
  const userExist = session.checkUserExist({ sid, username });
  if(!userExist) {
    response(res)({status: 403});
    return;
  }
  const todo = req.body.todo;
  response(res)({ data: todos.addTodo({ username, todo })});
};

routes.todos.one.update = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    response(res)({status: 401});
    return;
  }
  const username = req.params.username;
  const userExist = session.checkUserExist({ sid, username });
  if(!userExist) {
    response(res)({status: 403});
    return;
  }
  const todoId = req.params.todoId;
  const todo = req.body.todo;
  const newTodo = todos.updateTodo({ username, todoId, todo });
  if(!newTodo) {
    response(res)({status: 400});
    return;
  }
  response(res)({ data: newTodo } );
};

routes.todos.one.remove = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    response(res)({status: 401});
    return;
  }
  const username = req.params.username;
  const userExist = session.checkUserExist({ sid, username });
  if(!userExist) {
    response(res)({status: 403});
    return;
  }
  const todoId = req.params.todoId;
  const todo = todos.deleteTodo({ username, todoId });
  if(!todo) {
    response(res)({ status: 404});
    return;
  }
  response(res)({ data: todo } );
};

module.exports = routes;
