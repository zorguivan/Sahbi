import Immutable from 'immutable';

export default function createInitialState(){
  return {
    projects : [],
    project : {},
    sessions : [],
    todos: [],
    notes : [],
    note : {},
    track: [],
    testData : 'empty',
    tracker: false,
    todo: {}
  }
}
