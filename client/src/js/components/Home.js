import React from 'react';
import {connect} from 'react-redux';
import * as ProjectsActions from '../actions/ProjectsActions';
import {Button} from 'react-bootstrap';

import SingleProject from './SingleProject';
import ProjectAddModal from './ProjectAddModal';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            showProjectAddModal: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentWillMount() {
        ProjectsActions.getProjects();
    }
    openModal() {
        this.setState({showProjectAddModal: true});
    }
    closeModal() {
        this.setState({showProjectAddModal: false});
    }

    render() {
        let projects = this.props.projects.map((project) => {
            return <SingleProject key={project.id} project={project}/>
        });
        let showProjectAddModal = this.state.showProjectAddModal;

        return (

            <div className="jumbotron">
                <div className="tableContainer">
                    <h3>Projects:
                        <Button bsStyle="success" onClick={this.openModal}>
                            <span className="glyphicon glyphicon-plus"></span>
                        </Button>
                    </h3>
                    <ProjectAddModal showProjectAddModal={showProjectAddModal} closeModal={this.closeModal}/>
                    <table className="table table-bordered">
                        <thead>
                            <tr className="headerProject">
                                <th>Project Name</th>
                                <th>id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

export default connect((state) => {
    return {projects: state.projects}
})(Home);

Home.propTypes = {
  projects: React.PropTypes.array
}
