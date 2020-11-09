export const login = (username) => {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
    'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
    .then(response => { return response.json();
    });
};

export const logout = () => {
  return fetch('/session', {
    method: 'DELETE',
    })
    .then(response => {
      return response.ok;
    });
};

export const getStatus = () => {
  return fetch('/session', {
    method: 'GET',
    })
    .then(response => { return response.json();
    });
};

export const addTodo = ({username, todo}) => {
  const URL = '/todos/' + username;
  todo = {content: todo, status:false}
  return fetch(URL, {
    method: 'POST',
    headers: new Headers({
    'content-type': 'application/json',
    }),
    body: JSON.stringify( {todo} ),
  })
    .then(response => { return response.json();
  })
}
  
export const deleteTodo = ({username, todoId}) => {
  const URL = '/todos/' + username + '/' + todoId;
  return fetch(URL, {
    method: 'DELETE',
  })
    .then(response => { return response.json();
  })
}

export const getTodos = (username) => {
  const URL = '/todos/' + username;
  return fetch(URL, {
    method: 'GET',
    })
    .then(response => {
      return response.json();
    })
}

export const updateTodo = ({username, todoId, todo}) => {
  const URL = '/todos/' + username + '/' + todoId;
  return fetch(URL, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify( {todo} ),
    })
    .then(response => {
      return response.json();
    })
}
