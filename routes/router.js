var express = require('express');
var router = express.Router();

var dbTodo = require('../models/todo');

/* GET info api */
router.get('/', function(req, res, next) {
  res.json({ version: 1.0, description: 'Api Todoapp inalambria' });
});

/* GET home page. */
router.get('/todos', dbTodo.getTodos);

/* GET home page. */
router.post('/todos', dbTodo.postTodos);

/* GET home page. */
router.put('/todos/:id', dbTodo.putTodos);

/* GET home page. */
router.delete('/todos/:id', dbTodo.deleteTodos);

module.exports = router;