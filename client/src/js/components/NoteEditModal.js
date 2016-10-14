import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import * as NotesActions from '../actions/NotesActions';

export default class NoteEditModal extends React.Component {
    constructor() {
        super();
        this.state = {
            note: {}
        }
    }

    handleChange(e) {
        this.props.note.text = "";
        this.props.note.text = e.target.value;
        let note = this.props.note;
        this.setState({note: note});
    }

    saveNote() {
        let note = {};
        if (this.state.note.id) {
            note = this.state.note;
        } else {
            note.text = this.refs.note.value;
            note.project_id = this.props.project_id;
            // note.date = TimeKeeper.stampDate(TimeKeeper.startDate());
            this.setState({note: note});
        }
        if (note.text.length <= 0 && note.id) {
            NotesActions.deleteNote(note.id, note.date);
            this.props.closeNoteEditModal();
        } else if (note.text.length <= 0) {
            this.props.closeNoteEditModal();
        } else {
            NotesActions.saveNote(note);
            this.props.closeNoteEditModal();
        }
        this.props.closeNoteEditModal();
    }

    render() {
        let note = {};
        let textArea = <textarea className="form-control" ref="note" rows="20" value={note.text}></textarea>;
        if (this.props.note) {
            note = this.props.note;
            textArea = <textarea className="form-control" ref="note" rows="20" value={note.text} onChange={this.handleChange.bind(this)}></textarea>;
        }
        let showNoteEditModal = this.props.showNoteEditModal;
        return (
            <Modal show={showNoteEditModal} onHide={this.props.closeNoteEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editing Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <div className="form-group">{textArea}</div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.closeNoteEditModal}>Close</Button>
                    <Button bsStyle="primary" onClick={this.saveNote.bind(this)}>Edit</Button>
                </Modal.Footer>
            </Modal>

        )
    }
}

NoteEditModal.propTypes = {
  note: React.PropTypes.object,
  project_id: React.PropTypes.number,
  closeNoteEditModal: React.PropTypes.func,
  showNoteEditModal: React.PropTypes.bool
}
