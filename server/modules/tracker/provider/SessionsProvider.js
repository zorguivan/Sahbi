var q = require('q');

var connection;

function SessionsProvider() {
    return {
        setConnection: setConnection,
        addSession: addSession,
        getProjectSessions: getProjectSessions,
        getSessions: getSessions,
        updateSession: updateSession,
        deleteSession: deleteSession,
        searchSessions: searchSessions
    }

    function setConnection(conn){
      connection = conn;
    }

    function addSession(session){
      var execution = q.defer();
      var query = "INSERT INTO sessions SET :data";
      connection.query(query, {data: session}, function(err, res){
        if(err){
          console.log(err);
          execution.reject(err);
          return;
        }
        execution.resolve(err);
      });
      return execution.promise;
    }

    function getProjectSessions(projectId){
      var execution = q.defer();
      var query = "SELECT * FROM sessions WHERE project_id = :id";
      connection.query(query, {id: projectId}, function(err, res){
        if(err){
          console.log(err);
          execution.reject(err);
          return;
        }
        execution.resolve(res);
      });
      return execution.promise;
    }

    function searchSessions(startDate, endDate, projectId){
      var execution = q.defer();
      var query = "SELECT * FROM SESSIONS WHERE date >= :startDate AND date < :endDate AND project_id = :projectId";
      connection.query(query, {startDate: startDate, endDate: endDate, projectId: projectId},function(err, res){
        if(err){
          console.log(err);
          execution.reject(err);
          return;
        }
        console.log(res);
        execution.resolve(res);
      });
      return execution.promise;
    }

    function getSessions(){
      var execution = q.defer();
      var query = "SELECT * FROM sessions";
      connection.query(query, function(err, res){
        if(err){
          console.log(err);
          execution.reject(err);
          return;
        }
        execution.resolve(res);
      });
      return execution.promise;
    }

    function updateSession(session){
      console.log('Sessions Provider ++++++++++++++++++ Updating');
      console.log(session);
      var execution = q.defer();
      var query = "UPDATE sessions SET :data where id = :id";
      connection.query(query, {data: session, id: session.id}, function(err, res){
        if(err){
          console.log(err);
          execution.reject(err);
          return;
        }
        execution.resolve(res);
      });
      return execution.promise;
    }
    function deleteSession(id){
      var execution =q.defer();
      var query = "DELETE FROM sessions WHERE id = :id";
      connection.query(query, {id : id}, function(err, res){
        if(err){
          console.log(err);
          execution.reject(err);
        }
        execution.resolve(res);
      });
      return execution.promise;
    }
}

module.exports = SessionsProvider();
