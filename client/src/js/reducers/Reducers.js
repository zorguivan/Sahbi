import notesReducers from './NotesReducers';
import projectsReducers from './ProjectsReducers';
import sessionsReducers from './SessionsReducers';

var reducers = {};

reducers = Object.assign(reducers, notesReducers);
reducers = Object.assign(reducers, projectsReducers);
reducers = Object.assign(reducers, sessionsReducers);
export default reducers;
