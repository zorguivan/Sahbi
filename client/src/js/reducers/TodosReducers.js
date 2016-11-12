const TodosReducers = {
  'GET_TODOS': (state, action) => {
    return Object.assign({}, state, {todos : action.todos});
  },
  'SERVER_ERROR' : (state, action) => {
    console.log(action.error);
    return state;
  },
  'GET_TRACK': (state, action) => {
    return Object.assign({}, state, {track: action.track});
  }
}

export default TodosReducers;
