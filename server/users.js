// storage
const users = {};

// function: get
const getUser = (username) => {
  if(!users[username]) {
    users[username] = { username };
  }
  return users[username];
};

module.exports = {
  getUser,
};