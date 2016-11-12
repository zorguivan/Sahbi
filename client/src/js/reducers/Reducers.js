import notesReducers from './NotesReducers';
import projectsReducers from './ProjectsReducers';
import sessionsReducers from './SessionsReducers';
import TodosReducers from './TodosReducers'

var reducers = {};

reducers = Object.assign(reducers, notesReducers);
reducers = Object.assign(reducers, projectsReducers);
reducers = Object.assign(reducers, sessionsReducers);
reducers = Object.assign(reducers, TodosReducers);
export default reducers;
