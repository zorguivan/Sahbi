import Immutable from 'immutable';

const TodosReducers = {
  'GET_TODOS': (state, action) => {
    state = Immutable.fromJS(state).set('todos', action.todos).toJS();
    return state;
  },
  'GET_TRACK': (state, action) => {
    state = Immutable.fromJS(state).set('todos', action.todos).toJS();
    return state;
  },
  'GET_DAILY_TODOS': (state, action) => {
    state = Immutable.fromJS(state).set('todos', action.todos);
    return state;
  },
  'SERVER_ERROR' : (state, action) => {
    console.log(action.error);
    return state;
  }
}

export default TodosReducers;
