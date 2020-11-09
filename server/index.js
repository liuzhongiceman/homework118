const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(cookieParser());
app.use(express.static('./build'));

// routes
app.get('/session', routes.session.status);
app.post('/session', routes.session.create);
app.delete('/session', routes.session.deleteUser);

app.post('/todos/:username', routes.todos.one.add);
app.put('/todos/:username/:todoId', routes.todos.one.update);
app.delete('/todos/:username/:todoId', routes.todos.one.remove);

app.listen(5000, () => console.log(`listening on http://localhost:5000`) );
