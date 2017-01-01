import {
    createStore,
    combineReducers
} from 'redux';

import Immutable from 'immutable';

import createInitialState from '../start_up';
import reducers from '../reducers/Reducers';
let initialState = Immutable.Map(createInitialState());

var appReducer = function(state = initialState, action) {
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    } else {
        return state;
    }
}
const store = createStore(appReducer, initialState);

window.store = store;

export default store;


/*

import {
    createStore,
} from 'redux';

import {
     combineReducers
} from 'redux-immutable';

import Immutable from 'immutable';

import createInitialState from '../start_up';
import reducers from '../reducers/Reducers';



let appReducer = function(state = Immutable.Map(createInitialState()), action) {
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    } else {
        return state;
    }
}
const store = createStore(appReducer, Immutable.Map(createInitialState()));

window.store = store;

export default store;


*/
