var NotesProvider = require('../provider/NotesProvider');

module.exports = NotesController();

function NotesController() {
    return {
        addNote: addNote,
        getNotes: getNotes,
        getNote: getNote,
        updateNote: updateNote,
        stampDate, stampDate,
        deleteNote: deleteNote
    }


    function addNote(req, res, next) {
        NotesProvider.addNote(req.body).then(function(result) {
          console.log(req.body);
            res.json(result);
        }).catch(function(err) {
            res.status(500).send(err);
        });
    }

    function getNotes(req, res, next) {
      console.log('Getting Project Notes -- Controller');
        NotesProvider.getNotes(req.params.id).then(function(result) {
            res.json(result);
        }).catch(function(err) {
            res.status(500).send(err);
        });
    }

    function getNote(req, res, next) {
        NotesProvider.getNote(req.params.date).then(function(result) {
            res.json(result);
        }).catch(function(err) {
            res.status(500).send(err);
        });
    }

    function updateNote(req, res, next) {
      req.body.date = stampDate(req.body.date);
      console.log('stamping date', req.body.date);
        NotesProvider.updateNote(req.body).then(function(result) {
            res.json(result);
        }).catch(function(err) {
            res.status(500).send(err);
        });
    }
    function deleteNote(req, res, next){
      NotesProvider.deleteNote(req.params.id).then(function(result){
        res.json(result);
      }).catch(function(err){
        res.status(500).send(err);
      })
    }

    function stampDate(date) {
        if (date) {
            if (date.length == 10) {
                date = date.split('-');

                var newDate = date[1] + "," + date[0] + "," + date[2];

                var today = new Date(newDate).getTime();
                // console.log(today);
                return today;
            } else {
                return date;
            }
        } else {
            var today = new Date().getTime();
            return today
        }
    }

}
