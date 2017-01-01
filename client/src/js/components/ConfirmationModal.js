import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import * as ProjectsActions from '../actions/ProjectsActions';
import {browserHistory} from 'react-router'


export default class ConfirmationBox extends React.Component {

    deleteProject(projectId) {
      ProjectsActions.deleteProject(projectId);
      browserHistory.goBack()
      // this.props.closeConfirmationModal()
    }
    render() {
        let showConfirmationModal = this.props.showConfirmationModal;
        let projectName;
        let projectId;
        if(this.props.project){
          projectName = this.props.project.name;
          projectId = this.props.project.id;
        }
        return (
            <Modal show={showConfirmationModal} onHide={this.props.closeConfirmationModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <div className="form-group"><label>Are you sure you want to delete the project : <p>{projectName}</p></label></div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.deleteProject.bind(this, projectId)} bsStyle="danger">Delete</Button>
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
