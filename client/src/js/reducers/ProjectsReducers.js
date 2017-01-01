import Immutable from 'immutable';

const ProjectsReducers = {
    'GET_PROJECTS': (state, action) => {
        state = Immutable.fromJS(state).set('projects', action.projects).toJS();
        return state
    },
    'GET_PROJECT': (state, action) => {
        state = Immutable.fromJS(state).set('project', action.project).toJS();
        return state;
    },
    'SERVER_ERROR': (state, action) => {
        console.log(action.error);
        return state;
    }
}

export default ProjectsReducers;

/*

import Immutable from 'immutable';

const initialState = Immutable.Map({});

const ProjectsReducers = {
  'GET_PROJECTS': (state = initialState, action) => {
    console.log(action.projects);
    return state.set('projects', action.projects);
    console.log(state);
    console.log(initialState);
  },
  'GET_PROJECT' : (state = initialState, action) => {
    return state.set('project', action.project);
  },
  'SERVER_ERROR' : (state = initialState, action) => {
    console.log(action.error);
    return state;
  }
}

export default ProjectsReducers;

 */
