const ProjectsReducers = {
  'GET_PROJECTS': (state, action) => {
    return Object.assign({}, state, {projects : action.projects});
  },
  'GET_PROJECT' : (state, action) => {
    return Object.assign({}, state, {project: action.project});
  },
  'SERVER_ERROR' : (state, action) => {
    console.log(action.error);
    return state;
  }
}

export default ProjectsReducers;
