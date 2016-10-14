const SessionsReducers = {
  'GET_SESSIONS': (state, action) => {
    return Object.assign({}, state, {sessions : action.sessions});
  },
  'GET_PROJECT_SESSIONS': (state, action) => {
    return Object.assign({}, state, {sessions: action.sessions});
  },
  'GET_SEARCH_SESSIONS': (state, action) => {
    return Object.assign({}, state, {sessions: action.sessions});
  },
  'SERVER_ERROR' : (state, action) => {
    console.log(action.error);
    return state;
  }
}

export default SessionsReducers;
