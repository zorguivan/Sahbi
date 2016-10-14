import React from 'react';
import {Button} from 'react-bootstrap';
import NoteViewModal from './NoteViewModal';
import NoteEditModal from './NoteEditModal';

import * as TimeKeeper from '../services/Time_Keeper';

export default class SingleNote extends React.Component {

    constructor() {
        super();
        this.state = {
            showNoteEditModal: false,
            showNoteViewModal: false
        }
    }
    openModal(name){
      let state = this.state || {};
      state[name] = true;
      this.setState(state);
    }
    closeModal(name){
      let state = this.state || {};
      state[name] = false;
      this.setState(state);
    }

    modalOrder(note) {
        let now = TimeKeeper.stampDate(TimeKeeper.startDate());
        if (note.date == now) {
          this.openModal('showNoteEditModal');
        } else {
          this.openModal('showNoteViewModal');
        }
    }
    render() {
        let showNoteViewModal = this.state.showNoteViewModal;
        let showNoteEditModal = this.state.showNoteEditModal;
        let note = this.props.note;
        return (
            <tr key={note.id}>
                <NoteViewModal showNoteViewModal={showNoteViewModal} closeNoteViewModal={this.closeModal.bind(this, 'showNoteViewModal')} note={note}/>
                <NoteEditModal showNoteEditModal={showNoteEditModal} closeNoteEditModal={this.closeModal.bind(this, 'showNoteEditModal')} note={note}/>
                <td>
                    <Button type="button" className="btn btn-primary" onClick={this.modalOrder.bind(this, note)}>
                        {TimeKeeper.startDate(note.date)}
                    </Button>
                </td>
                <td>{note.id}</td>
            </tr>
        )
    }
}

SingleNote.propTypes = {
  note: React.PropTypes.object
}
