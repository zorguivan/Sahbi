var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'client/bower_components')));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "josefx32",
  database: "keeper"
});

connection.config.queryFormat = function(query, values) {
  if (!values) return query;
  return query.replace(/\:(\w+)/g, function(txt, key) {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key]);
    }
    return txt;
  }.bind(this));
};


var tracker = require('./server/modules/tracker/module.js')(app);

var ProjectsProvider = require('./server/modules/tracker/provider/ProjectsProvider');
var SessionsProvider = require('./server/modules/tracker/provider/SessionsProvider');
var NotesProvider = require('./server/modules/tracker/provider/NotesProvider');
var TodosProvider = require('./server/modules/tracker/provider/TodosProvider');

SessionsProvider.setConnection(connection);
ProjectsProvider.setConnection(connection);
NotesProvider.setConnection(connection);
TodosProvider.setConnection(connection);

var router = express.Router();
tracker.activateRoutes(router);
app.use(router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err })
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err })
});


module.exports = app;
