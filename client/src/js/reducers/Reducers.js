
import Immutable from 'immutable';

import notesReducers from './NotesReducers';
import projectsReducers from './ProjectsReducers';
import sessionsReducers from './SessionsReducers';
import TodosReducers from './TodosReducers'

var reducers = Immutable.Map({});

reducers = reducers.merge(reducers, notesReducers);
reducers = reducers.merge(reducers, projectsReducers);
reducers = reducers.merge(reducers, sessionsReducers);
reducers = reducers.merge(reducers, TodosReducers).toJS();
console.log(reducers);
export default reducers;




//
// import notesReducers from './NotesReducers';
// import projectsReducers from './ProjectsReducers';
// import sessionsReducers from './SessionsReducers';
// import TodosReducers from './TodosReducers'
//
// var reducers = {};
//
// reducers = Object.assign(reducers, notesReducers);
// reducers = Object.assign(reducers, projectsReducers);
// reducers = Object.assign(reducers, sessionsReducers);
// reducers = Object.assign(reducers, TodosReducers);
// console.log(reducers);
// export default reducers;
