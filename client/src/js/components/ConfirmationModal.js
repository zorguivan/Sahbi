import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import * as ProjectsActions from '../actions/ProjectsActions';
import {browserHistory} from 'react-router'


export default class ConfirmationBox extends React.Component {

    deleteProject(project) {
      ProjectsActions.deleteProject(project.id);
      browserHistory.goBack()
      // this.props.closeConfirmationModal()
    }
    render() {
        let showConfirmationModal = this.props.showConfirmationModal;
        let project = this.props.project;

        return (
            <Modal show={showConfirmationModal} onHide={this.props.closeConfirmationModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <div className="form-group"><label>Are you sure you want to delete the project : <p>{project.name}</p></label></div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.deleteProject.bind(this, project)} bsStyle="danger">Delete</Button>
                    <Button onClick={this.props.closeConfirmationModal} bsStyle="default">Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
ConfirmationBox.propTypes = {
  showConfirmationModal: React.PropTypes.bool,
  closeConfirmationModal: React.PropTypes.func,
  project: React.PropTypes.object,
}
