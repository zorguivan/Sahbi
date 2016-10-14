import store from '../store/AppStore';
import axios from 'axios';

export function  getSessions(){
  axios.get('/api/sessions').then((res) => {
    store.dispatch({
      type: "GET_SESSOINS",
      sessions: res.data
    });
  }).catch((error) => {
    store.dispatch({
      type: 'SERVER_ERROR',
      error : error
    });
  })
}

 export function  getProjectSessions(projectId) {
        axios.get('/api/sessions/' + projectId).then((res) => {
            store.dispatch({
                type: "GET_PROJECT_SESSIONS",
                sessions: res.data
            });
        }).catch((error) => {
            store.dispatch({
                type: "SERVER_ERROR",
                error: error
            });
        });
    }

export function search(startDate, endDate, projectId){
  axios.get('/api/sessions/' + startDate + '/' + endDate + '/' + projectId).then((res) => {
    store.dispatch({
        type: 'GET_SEARCH_SESSIONS',
        sessions: res.data
    });
  }).catch((error) => {
    store.dispatch({
      type: "SERVER_ERROR",
      error: error
    });
  });
}

export function addSession(session){
  axios.post('/api/sessions', session).then(() => {
    getProjectSessions(session.project_id);
  }).catch((error) => {
    store.dispatch({
      type: 'SERVER_ERROR',
      error : error
    });
  })
}

export function updateSession(session){
  axios.put('/api/sessions', session).then(() => {
    this.getSessions(session.project_id);
  }).catch((error) => {
    store.dispatch({
      type: 'SERVER_ERROR',
      error : error
    });
  })
}

export function deleteSession(session){
  axios.delete('/api/sessions/' + session.id).then(() => {
    // console.log(deleted);
    getProjectSessions(session.project_id);
  }).catch((error) => {
    store.dispatch({
      type: 'SERVER_ERROR',
      error: error
    });
  })
}
