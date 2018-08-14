var express = require('express');
var router = express.Router();

var dbTodo = require('../models/todo');

/* GET info api */
router.get('/', function(req, res, next) {
  res.json({ version: 1.0, description: 'Api Todoapp inalambria' });
});

/* GET all todos. */
router.get('/todos', dbTodo.getTodos);

/* Post one todo. */
router.post('/todos', dbTodo.postTodos);

/* Put one todo. */
router.put('/todos/:id', dbTodo.putTodos);

/* Delete one todo. */
router.delete('/todos/:id', dbTodo.deleteTodos);

module.exports = router;