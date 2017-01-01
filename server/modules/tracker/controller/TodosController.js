var TodosProvider = require('../provider/TodosProvider');

module.exports = TodosController();

function TodosController() {
    return {
        addTodo: addTodo,
        getTodos: getTodos,
        getTodo: getTodo,
        updateTodo: updateTodo,
        deleteTodo: deleteTodo,
        trackTodo: trackTodo,
        getTrack: getTrack,
        getDailyTodos: getDailyTodos
    }

    function getDailyTodos(req, res, next){
      TodosProvider.getDailyTodos(req.params.stamp, req.params.id).then(function(result){
        console.log('Daily todos recieved');
        res.json(result);
      }).catch(function(err) {
          res.status(500).send(err);
      });
    }

    function addTodo(req, res, next) {
      console.log('Todo adding- TodosController')
        TodosProvider.addTodo(req.body).then(function(result) {
          console.log(req.body);
            res.json(result);
        }).catch(function(err) {
            res.status(500).send(err);
        });
    }

    function getTodos(req, res, next) {
      console.log('Getting Project Todos -- Controller');
        TodosProvider.getTodos(req.params.id).then(function(result) {
            res.json(result);
        }).catch(function(err) {
            res.status(500).send(err);
        });
    }

    function getTodo(req, res, next) {
        TodosProvider.getTodo(req.params.date).then(function(result) {
            res.json(result);
        }).catch(function(err) {
            res.status(500).send(err);
        });
    }

    function updateTodo(req, res, next) {
      console.log('Updating TODO ---- Server');
      console.log(res.body);
        TodosProvider.updateTodo(req.body).then(function(result) {
            res.json(result);
        }).catch(function(err) {
            res.status(500).send(err);
        });
    }
    function deleteTodo(req, res, next){
      TodosProvider.deleteTodo(req.params.id).then(function(result){
        res.json(result);
      }).catch(function(err){
        res.status(500).send(err);
      })
    }
    function trackTodo(req, res, next){
      TodosProvider.trackTodo(req.body).then(function(result){
        res.json(result);
      }).catch(function(error){
        res.status(500).send(error);
      });
    }
    function getTrack(req, res, next){
      console.log('Getting Tracks for the todo with if of :', req.params.start_range, req.params.end_range);
      TodosProvider.getTrack(req.params.start_range, req.params.end_range).then(function(result){
        res.json(result)
      }).catch(function(error){
        res.status(500).send(err);
      });
    }

}
