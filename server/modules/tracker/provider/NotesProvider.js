var q = require('q');

var connection;

function NotesProvider() {
    return {
        setConnection: setConnection,
        addNote: addNote,
        getNotes: getNotes,
        getNote: getNote,
        updateNote: updateNote,
        deleteNote: deleteNote
    }

    function setConnection(conn) {
        connection = conn;
    }



    function addNote(note) {
        var execution = q.defer();
        var query = "INSERT INTO notes SET date = :date, project_id  = :project_id, text = :text";
        connection.query(query, {
            date: note.date,
            project_id: note.project_id,
            text: note.text
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


    function getNotes(id) {
        var execution = q.defer();
        var query = "SELECT * FROM notes WHERE project_id = :id";
        connection.query(query,{id: id} , function(err, res) {
          console.log('Requesting Project Notes');
          console.log(res);
            if (err) {
                console.log(err);
                execution.reject(err);
                return;
            }
            execution.resolve(res);
        });
        return execution.promise;
    }

    function getNote(date) {
      console.log('Getting Active Note');
      var execution = q.defer();
      var query = "SELECT * FROM notes WHERE date = :date";
      connection.query(query, {
        date: date
      }, function(err, res) {
        console.log('res');
        if (err) {
          console.log(err);
          execution.reject(err);
          return;
        }
        execution.resolve(res);
      });
      return execution.promise;
    }

    function updateNote(note) {
      console.log(note);
        var execution = q.defer();
        var query = "UPDATE notes SET :data WHERE id = :id";
        connection.query(query, {
            data: note,
            id: note.id
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

    function deleteNote(noteId){
      var execution = q.defer();
      var query = "DELETE FROM notes WHERE id = :id";
      connection.query(query, {
        id: noteId
      }, function(err, res){
        if(err){
          console.log(err);
          execution.reject(err);
          return;
        }
        execution.resolve(res);
      });
      return execution.promise;
    }
}

module.exports = NotesProvider();
