import store from '../store/AppStore';
import axios from 'axios';

export function getProjects(){
  axios.get('/api/projects').then((res) => {

    store.dispatch({
      type: 'GET_PROJECTS',
      projects: res.data
    });
  }).catch((error) => {
    store.dispatch({
      type: 'SERVER_ERROR',
      error : error
    });
  })
}

export function getProject(id){
  axios.get('/api/projects/' + id).then((res) => {
    store.dispatch({
      type: 'GET_PROJECT',
      project: res.data[0]
    });
  }).catch((error) => {
    store.dispatch({
      type: 'SERVER_ERROR',
      error : error
    });
  })
}

export function addProject(project){
  return axios.post('/api/projects', project).then(() => {
    getProjects();
    return;
  }).catch((error) => {
    store.dispatch({
      type: 'SERVER_ERROR',
      error : error
    });
  })
}

export function updateProject(project){
  axios.put('/api/projects', project).then((res) => {
  }).catch((error) => {
    store.dispatch({
      type: 'SERVER_ERROR',
      error : error
    });
  })
}

export function deleteProject(id){
  axios.delete('/api/projects/' + id).then((res) => {
    this.getProjects();
  }).catch((error) => {
    store.dispatch({
      type: 'SERVER_ERROR',
      error : error
    });
  })
}
