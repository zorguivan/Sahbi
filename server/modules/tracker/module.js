var express = require('express');
var path = require('path');
var ProjectsController = require('./controller/ProjectsController');
var SessionsController = require('./controller/SessionsController');
var NotesController = require('./controller/NotesController');
var TodosController = require('./controller/TodosController');

module.exports = function(app){
  function activateRoutes(router) {
    router.use(activateServer());
  }

  function activateServer(app) {
    router = express.Router();

    router.get('/api/projects', ProjectsController.getProjects);
    router.get('/api/projects/:id', ProjectsController.getProject);
    router.post('/api/projects', ProjectsController.addProject);
    router.put('/api/projects', ProjectsController.updateProject);
    router.delete('/api/projects/:id', ProjectsController.deleteProject);

    router.get('/api/sessions', SessionsController.getSessions);
    router.get('/api/sessions/:id', SessionsController.getProjectSessions);
    router.get('/api/sessions/:startDate/:endDate/:id', SessionsController.searchSessions);
    router.post('/api/sessions', SessionsController.addSession);
    router.put('/api/sessions', SessionsController.updateSession);
    router.delete('/api/sessions/:id', SessionsController.deleteSession);

    router.get('/api/notes/:date', NotesController.getNote);
    router.get('/api/p_notes/:id', NotesController.getNotes);
    router.post('/api/notes', NotesController.addNote);
    router.put('/api/notes', NotesController.updateNote);
    router.delete('/api/notes/:id', NotesController.deleteNote);

    router.post('/api/todos', TodosController.addTodo);
    router.get('/api/todos/:id', TodosController.getTodos);
    router.put('/api/todos', TodosController.updateTodo);
    router.delete('/api/todos/:id', TodosController.deleteTodo);
    router.get('/api/tracks/:start_range/:end_range', TodosController.getTrack);
    router.post('/api/tracks', TodosController.trackTodo);

    return router;

  }
  return {
    activateRoutes: activateRoutes
  }
}
