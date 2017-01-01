import Immutable from 'immutable';

const SessionsReducers = {
  'GET_SESSIONS': (state, action) => {
    state = Immutable.fromJS(state).set('sessions', action.sessions).toJS();
    return state;
  },
  'GET_PROJECT_SESSIONS': (state, action) => {
    state = Immutable.fromJS(state).set('sessions', action.sessions).toJS();
    console.log(state);
    return state;
  },
  'GET_SEARCH_SESSIONS': (state, action) => {
    state = Immutable.fromJS(state).set('sessions', action.sessions).toJS();
    return state;
  },
  'SESSION_TRACKED': (state, action) => {
    state = Immutable.fromJS(state).set('tracker', action.tracker).toJS();
    return state;
  },
  'SERVER_ERROR' : (state, action) => {
    console.log(action.error);
    return state;
  }
}

export default SessionsReducers;
