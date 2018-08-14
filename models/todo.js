var promise = require('bluebird');

// Initialization Options
var postgres = require('pg-promise')({ promiseLib: promise });
var connect = process.env.DATABASE_URL + '?ssl=true';
//var connect = 'postgres://inalambria:199599@localhost:5432/todoapp';
var db = postgres(connect, function(err, client, done) {
    if(err)
      return console.error('error fetching client from pool', err);
});


// get all task of todoapp
// return state 20 ok and json with data
function getTodos(req, res, next) {

  db.any('select * from item').then(function (data) {
      res.status(200).json({ data: data });
  }).catch(function (err) {
      return next(err);
  });

}


// insert new one task of todoapp
// @paramas name string
// @paramas finished boolean
// return state 20 ok and json info message
function postTodos(req, res, next) {
  var body = {
    name: req.body.name,
    finished: (req.body.finished === 'true'),
  }
  db.result('INSERT INTO item(name, finished) VALUES(${name}, ${finished})', body).then(function (result) {
      res.status(200).json({ info: 'Actividad agregada', result: result });
  }).catch(function (err) {
      return next(err);
  });
}

// update one task of todoapp
// @paramas id integer
// @paramas name string
// @paramas finished boolean
// return state 20 ok and json info message
function putTodos(req, res, next) {
  var id = parseInt(req.params.id)

  db.none('update item set name=$1, finished=$2 where id=$3', [req.body.name, (req.body.finished === 'true'), id])
    .then(function () {
        res.status(200).json({ info: 'Actividad Actualizada' });
    }).catch(function (err) {
        return next(err);
    });
}

// delete one task of todoapp
// @paramas id integer
// return state 20 ok and json info message
function deleteTodos(req, res, next) {
  var id = parseInt(req.params.id);

  db.result('delete from item where id = $1', id).then(function (result) {
      res.status(200).json({ info: `Actividad Eliminadas: ${result.rowCount}` });
  }).catch(function (err) {
      return next(err);
  });

}

// export midellwares
module.exports = {
  getTodos: getTodos,
  postTodos: postTodos,
  putTodos: putTodos,
  deleteTodos: deleteTodos,
};