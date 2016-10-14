import React from 'react';
import {Modal, Button} from 'react-bootstrap';

import * as TimeKeeper from '../services/Time_Keeper';
export default class NoteViewModal extends React.Component {
    render() {
        let showNoteViewModal = this.props.showNoteViewModal;
        let textArea = <textarea className="form-control" ref="note" rows="20" value={this.props.note.text} disabled></textarea>;
        return (
            <Modal show={showNoteViewModal} onHide={this.props.closeNoteViewModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{TimeKeeper.startDate(this.props.note.date)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <div className="form-group">{textArea}</div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.closeNoteViewModal} bsStyle="success">Ok</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

NoteViewModal.propTypes = {
  showNoteViewModal: React.PropTypes.bool,
  closeNoteViewModal: React.PropTypes.bool,
  note: React.PropTypes.object
}
