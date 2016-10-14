var SessionsProvider = require('../provider/SessionsProvider');

module.exports = SessionsController();

function SessionsController() {
  return {
    addSession: addSession,
    getProjectSessions: getProjectSessions,
    getSessions: getSessions,
    updateSession: updateSession,
    deleteSession: deleteSession,
    searchSessions: searchSessions
  }

  function addSession(req, res, next){
    SessionsProvider.addSession(req.body).then(function(result){
      console.log('adding session', req.body);
      res.json(result);
    }).catch(function(err){
      res.status(500).send(err);
    });
  }

  function getProjectSessions(req, res, next) {
    SessionsProvider.getProjectSessions(req.params.id).then(function(result){
      res.json(result);
    }).catch(function(error){
      res.status(500).send(error);
      console.log(error);
    });
  }

function searchSessions(req, res, next){
  SessionsProvider.searchSessions(req.params.startDate, req.params.endDate, req.params.id).then(function(result){
    res.json(result);
  }).catch(function(error){
    res.status(500).send(error);
    console.log(error);
  });
}

  function getSessions(req, res, next){
    SessionsProvider.getSessions().then(function(result){
      res.json(result);
    }).catch(function(error){
      console.log(error);
      res.status(500).send(error);
    });
  }

  function updateSession(req, res, next){
    req.body.date = stampDate(req.body.date);
    SessionsProvider.updateSession(req.body).then(function(result){
      console.log('Sessions Controller -------------- Updating:');
      console.log(req.body);
      res.json(result);
    }).catch(function(error){
      console.log(error);
      res.status(500).send(error);
    });
  }

  function deleteSession(req, res, next){
    SessionsProvider.deleteSession(req.params.id).then(function(result){
      res.json(result);
    }).catch(function(error){
      console.log(error);
      res.status(500).send(error);
    });
  }

  function stampDate(date) {
      if (date) {
          if (date.length == 10) {
              date = date.split('/');

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
