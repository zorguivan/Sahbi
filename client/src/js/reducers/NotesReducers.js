const NotesReducers = {
  'GET_NOTES': (state, action) => {
    return Object.assign({}, state, {notes : action.notes});
  },
  'GET_NOTE' : (state, action) => {
    return Object.assign({}, state, {note: action.note});
  },
  'SERVER_ERROR' : (state, action) => {
    console.log(action.error);
    return state;
  }
}

export default NotesReducers;
