import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import * as ProjectsActions from '../actions/ProjectsActions';

export default class ProjectEditModal extends React.Component {
    constructor() {
        super();
        this.state = {
            project: {}
        }
    }
    handleChange(e) {
        this.props.project.name = e.target.value;
        let data = this.props.project;
        this.setState({
            project: {
                ...this.state.project,
                name: data.name
            }
        });
    }
    updateProject() {
        let project = {};
        project.name = this.refs.projectName.value;
        project.id = this.props.project.id;
        ProjectsActions.updateProject(project);
        this.props.closeProjectEditModal();
    }

    render() {

        let showProjectEditModal = this.props.showProjectEditModal;
        return (

            <Modal show={showProjectEditModal} onHide={this.props.closeProjectEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editing Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <label className="col-sm-4 control-label">Project Name</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" placeholder="Name" value={this.props.project.name} onChange={this.handleChange.bind(this)} ref="projectName"/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.closeProjectEditModal}>Close</Button>
                    <Button bsStyle="primary" onClick={this.updateProject.bind(this)}>Edit</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ProjectEditModal.propTypes = {
  project: React.PropTypes.object,
  showProjectEditModal: React.PropTypes.bool,
  closeProjectEditModal: React.PropTypes.func
}
