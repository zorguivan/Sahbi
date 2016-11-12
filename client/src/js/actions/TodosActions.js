import store from '../store/AppStore';
import axios from 'axios';

export function getTodos(projectId) {
    axios.get('/api/todos/' + projectId).then((res) => {
        store.dispatch({type: 'GET_TODOS', todos: res.data});
    }).catch((error) => {
        store.dispatch({type: 'SERVER_ERROR', error: error});
    })
}

export function addTodo(todo) {
    axios.post('/api/todos', todo).then((res) => {
        this.getTodos(todo.project_id);
    }).catch((error) => {
        store.dispatch({type: 'SERVER_ERROR', error: error});
    })
}

export function updateTodo(todo) {
    axios.put('/api/todos', todo).then((res) => {
        this.getTodos(todo.project_id);
    }).catch((error) => {
        store.dispatch({type: 'SERVER_ERROR', error: error});
    })
}

export function deleteTodo(todo) {
    axios.delete('/api/todos/' + todo.id).then((res) => {
        this.getTodos(todo.project_id);
    }).catch((error) => {
        store.dispatch({type: 'SERVER_ERROR', error: error});
    });
}
export function getTrack(range){
  console.log('Getting Todo track -- Client Actions')
  axios.get('/api/tracks/' + range[0] + '/' + range[1]).then((res) => {
    store.dispatch({
      type: 'GET_TRACK',
      track: res.data
    })
  })
}
export function trackTodo(detail) {
    axios.post('/api/tracks', detail).then((res) => {
      this.getTodos(detail.project_id);
    }).catch((error) => {
        store.dispatch({type: 'SERVER_ERROR', error: error});
    })
}
