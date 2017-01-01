var q = require('q');

var connection;

function TodosProvider() {
    return {
        setConnection: setConnection,
        addTodo: addTodo,
        getTodos: getTodos,
        updateTodo: updateTodo,
        deleteTodo: deleteTodo,
        getTrack: getTrack,
        trackTodo: trackTodo,
        getDailyTodos: getDailyTodos
    }

    function setConnection(conn) {
        connection = conn;
    }

    function getDailyTodos(stamp, id){
      console.log('Daily todos has been asked.');
      var execution = q.defer();
      var query = 'SELECT * FROM todos WHERE date = :date AND project_id = :id';
      connection.query(query, {date: stamp, id: id}, function(err, res){
        console.log(res);
        if(err){
          console.log(err);
          execution.reject(err);
        }
        execution.resolve(res);
      });
      return execution.promise;
    }

    function addTodo(todo) {
        var execution = q.defer();
        var query = "INSERT INTO todos SET :data";
        connection.query(query, {
            data: todo
        }, function(err, res) {
            if (err) {
                console.log(err);
                execution.reject(err);
                return;
            }
            execution.resolve(err);
        });
        return execution.promise;
    }

    function getTodos(projectId) {
        var execution = q.defer();
        var query = "SELECT * FROM todos WHERE project_id = :id";
        connection.query(query, {
            id: projectId
        }, function(err, res) {
            if (err) {
                console.log(err);
                execution.reject(err);
                return;
            }
            execution.resolve(res);
        });
        return execution.promise;
    }

    function updateTodo(todo) {
        console.log('Todos Provider ++++++++++++++++++ Updating');
        console.log(todo);
        var execution = q.defer();
        var query = "UPDATE todos SET :data where id = :id";
        connection.query(query, {
            data: todo,
            id: todo.id
        }, function(err, res) {
            if (err) {
                console.log(err);
                execution.reject(err);
                return;
            }
            execution.resolve(res);
        });
        return execution.promise;
    }

    function deleteTodo(id) {
        var execution = q.defer();
        var query = "DELETE FROM todos WHERE id = :id";
        connection.query(query, {
            id: id
        }, function(err, res) {
            if (err) {
                console.log(err);
                execution.reject(err);
            }
            execution.resolve(res);
        });
        return execution.promise;
    }

    function getTrack(start, end) {
        console.log('Getting track of todo === Provider');
        var execution = q.defer();
        var query = "SELECT * from todotracker WHERE start_range = :start AND end_range = :end";
        connection.query(query, {
            start: start,
            end: end
        }, function(err, res) {
            if (err) {
                console.log(err);
                execution.reject(err);
            }
            console.log('Response Found');
            console.log(res)
            execution.resolve(res);
        });
        return execution.promise;
    }

    function trackTodo(track) {
      var _track = track
      delete _track.project_id;
        var execution = q.defer();
        var query = "INSERT INTO todotracker SET :data";
        connection.query(query, {
            data: _track
        }, function(err, res) {
            if (err) {
                console.log(err);
                execution.reject(err);
            }
            execution.resolve(res);
        });
        return execution.promise;
    }

}

module.exports = TodosProvider();
