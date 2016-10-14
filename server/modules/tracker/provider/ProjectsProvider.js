var q = require('q');

var connection;

function ProjectsProvider(){
  return {
    setConnection: setConnection,
    addProject : addProject,
    getProject : getProject,
    getProjects : getProjects,
    updateProject: updateProject,
    deleteProject: deleteProject
  }

  function setConnection(conn){
    connection = conn;
  }

  function addProject(project){
    var execution = q.defer();
    var query = "INSERT INTO projects SET name = :name";
    connection.query(query, {name: project.name}, function(err, res){
      if(err){
        console.log(err);
        execution.reject(err);
        return;
      }
       execution.resolve(res);
    });
    return execution.promise;
  }

  function getProject(projectId){
    var execution = q.defer();
    var query = "SELECT * FROM projects WHERE id = :id";
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

  function getProjects(){
    var execution = q.defer();
    var query = "SELECT * FROM projects";
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

  function updateProject(project) {
    var execution = q.defer();
    var query = "UPDATE projects SET name = :name WHERE id = :id";
    connection.query(query, {name: project.name, id: project.id}, function(err, res){
      if(err){
        console.log(err);
        execution.reject(err);
        return;
      }
      execution.resolve(res);
    });
    return execution.promise;
  }

  function deleteProject(id){
    console.log('Database Deleting project Nr: ', id);
    var execution = q.defer();
    var query = "DELETE FROM projects WHERE id = :id";
    connection.query(query, {id : id}, function(err, res){
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

}

module.exports = ProjectsProvider();
