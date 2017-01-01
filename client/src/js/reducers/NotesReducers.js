import Immutable from 'immutable';

const NotesReducers = {
  'GET_NOTES': (state, action) => {
    state = Immutable.fromJS(state).set('notes', action.notes).toJS();
    return state;
  },
  'GET_NOTE' : (state, action) => {
    state = Immutable.fromJS(state).set('note', action.note).toJS();
    return state;
  },
  'SERVER_ERROR' : (state, action) => {
    console.log(action.error);
    return state;
  }
}

export default NotesReducers;
