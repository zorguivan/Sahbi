import {
    createStore,
    combineReducers
} from 'redux';

import createInitialState from '../start_up';
import reducers from '../reducers/Reducers';

var appReducer = function(state = createInitialState(), action) {
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    } else {
        return state;
    }
}
const store = createStore(appReducer, createInitialState());

window.store = store;

export default store;
