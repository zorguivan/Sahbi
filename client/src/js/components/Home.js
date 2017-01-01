import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as ProjectsActions from '../actions/ProjectsActions';
import {Button} from 'react-bootstrap';
import SingleProject from './SingleProject';
import ProjectAddModal from './ProjectAddModal';

export class Home extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentWillMount() {
        ProjectsActions.getProjects();
    }
    openModal(name) {
        let state = this.state || {};
        state[name] = true;
        this.setState(state);
    }
    closeModal(name) {
        let state = this.state || {};
        state[name] = false;
        this.setState(state);
    }
    componentDidMount() {
        this.setState({loaded: true});
    }
    componentWillReceiveProps(nextprops) {
        if (nextprops.projects && nextprops.projects[0].restricted) {
          this.redirectUser();
        }
    }
    redirectUser(){
      document.location.href = 'http://localhost:3000/login';
    }

    render() {

        let showProjectAddModal = this.state.showProjectAddModal;
        let projects = [];
        if (this.props.projects && this.props.projects.length > 0) {
            projects = this.props.projects.map((project) => {
                if (typeof project === 'object') {
                    return <SingleProject key={project.id || 0} project={project}/>
                }
            });
        } else {
            projects = '---'
        }

        return (

            <div className="jumbotron">
                <div className="tableContainer">
                    <h3>Projects:
                        <Button bsStyle="success" onClick={this.openModal.bind(this, 'showProjectAddModal')}>
                            <span className="glyphicon glyphicon-plus"></span>
                        </Button>
                    </h3>
                    <ProjectAddModal showProjectAddModal={showProjectAddModal} closeProjectAddModal={this.closeModal.bind(this, 'showProjectAddModal')}/>
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
