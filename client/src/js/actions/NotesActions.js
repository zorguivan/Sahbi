import store from '../store/AppStore';
import axios from 'axios';

export function getNotes(projectId) {
    axios.get('/api/p_notes/' + projectId).then((res) => {
      console.log(res);
        store.dispatch({type: 'GET_NOTES', notes: res.data});
    }).catch((error) => {
        store.dispatch({type: 'SERVER_ERROR', error: error});
    })
}

export function getNote(noteDate) {
    return axios.get('/api/notes/' + noteDate).then((res) => {
        store.dispatch({type: 'GET_NOTE', note: res.data[0]});
        return res;
    }).catch((error) => {
        store.dispatch({type: 'SERVER_ERROR', error: error});
    })
}

export function saveNote(note) {
    if (note.id) {
        axios.put('/api/notes', note).then((res) => {
            this.getNote(note.date);
        }).catch((error) => {
            store.dispatch({type: 'SERVER_ERROR', error: error});
        })
    } else {
        axios.post('/api/notes', note).then((res) => {
            this.getNote(note.date);
        }).catch((error) => {
            store.dispatch({type: 'SERVER_ERROR', error: error});
        })
    }
}

export function updateNote(note) {
    axios.put('/api/notes', note).then((res) => {}).catch((error) => {
        store.dispatch({type: 'SERVER_ERROR', error: error});
    })
}

export function deleteNote(noteId, date) {
    axios.delete('/api/notes/' + noteId).then((res) => {
        this.getNote(date);
    }).catch((error) => {
        store.dispatch({type: 'SERVER_ERROR', error: error});
    })
}
