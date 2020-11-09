const { v4: uuidv4 } = require('uuid');
const users = require('./users');

// seesion storage
const sessions = {};

// functions: validate, create and delete user
const validateSession = (sid) => {
  if(!sid || !sessions[sid] || sessions[sid].expires < Date.now() ) {
    return false;
  }
  return true;
}

const checkUserExist = ({ sid, username }) => {
  if(!sid || !username || !sessions[sid].username === username) {
    return false;
  }
  return true;
};

const createUser = (username) => {
  if(!username || !username.match(/^[A-Za-z0-9_-]{2,20}/)) {
    return false;
  }
  const info = users.getUser(username);
  const sid = uuidv4();
  sessions[sid] = {
    ...info,
    sid,
  };
  return sessions[sid];
};

const deleteUser = (sid) => { delete sessions[sid]; };

module.exports =  {
  validateSession,
  createUser,
  deleteUser,
  checkUserExist,
};
