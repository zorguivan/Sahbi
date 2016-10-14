import React from 'react';
import {Modal, Button} from 'react-bootstrap';

import * as ProjectsActions from '../actions/ProjectsActions';

export default class ProjectAddModal extends React.Component {

    addProject() {
        let project = {};
        project.name = this.refs.projectName.value;
        if(project.name.length > 0){
          ProjectsActions.addProject(project);
        }
        this.props.closeModal();
    }

    render() {
        let showProjectAddModal = this.props.showProjectAddModal;
        return (

            <Modal show={showProjectAddModal} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Adding Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <label className="col-sm-4 control-label">Project Name</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" placeholder="Name" ref="projectName"/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.closeModal}>Close</Button>
                    <Button bsStyle="primary" onClick={this.addProject.bind(this)}>Add</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ProjectAddModal.propTypes = {
  showProjectAddModal: React.PropTypes.bool,
  closeModal: React.PropTypes.func
}
