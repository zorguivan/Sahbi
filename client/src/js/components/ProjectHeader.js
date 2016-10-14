import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'

import * as NotesActions from '../actions/NotesActions';
import * as TimeKeeper from '../services/Time_Keeper';

import ProjectEditModal from './ProjectEditModal';
import NoteEditModal from './NoteEditModal';
import ConfirmationModal from './ConfirmationModal';

export default class ProjectHeader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentWillMount() {
        let today = TimeKeeper.stampDate(TimeKeeper.startDate());
        NotesActions.getNote(today);
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
    render() {
        let showProjectEditModal = this.state.showProjectEditModal;
        let showNoteEditModal = this.state.showNoteEditModal;
        let showConfirmationModal = this.state.showConfirmationModal;
        let data = this.props.project;
        let note = this.props.note;

        return (
            <div className="jumbotron">
                <ProjectEditModal showProjectEditModal={showProjectEditModal} closeProjectEditModal={this.closeModal.bind(this, 'showProjectEditModal')} project={data}/>
                <NoteEditModal showNoteEditModal={showNoteEditModal} closeNoteEditModal={this.closeModal.bind(this, 'showNoteEditModal')} project_id={data.id} note={note}/>
                <ConfirmationModal showConfirmationModal={showConfirmationModal} closeConfirmationModal={this.closeModal.bind(this, 'showConfirmationModal')} project={data}/>
                <div className="row">
                    <div className="col-md-2">
                        <h3>Project :
                        </h3>
                    </div>
                    <div className="col-md-3">
                        <h3>{this.props.project.name}</h3>
                    </div>
                    <div className="col-md-2"></div>

                    <div className="col-md-1">
                        <button type="button" className="btn-lg btn-primary" onClick={this.openModal.bind(this, 'showNoteEditModal')}>
                            <span className="glyphicon glyphicon-th-list"></span>
                        </button>
                    </div>

                    <div className="col-md-1">
                        <Link to={"/notes/" + data.id}>
                            <button type="button" className="btn-lg btn-success">
                                <span className="glyphicon glyphicon-folder-open"></span>
                            </button>
                        </Link>
                    </div>

                    <div className="col-md-1">
                        <button type="button" className="btn-lg btn-info" onClick={this.openModal.bind(this, 'showProjectEditModal')}>
                            <span className="glyphicon glyphicon-wrench"></span>
                        </button>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-1">
                        <button type="button" className="btn-lg btn-danger" onClick={this.openModal.bind(this, 'showConfirmationModal')}>
                            <span className="glyphicon glyphicon-trash"></span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {note: state.note}
})(ProjectHeader);

ProjectHeader.propTypes = {
  project: React.PropTypes.object,
  note: React.PropTypes.object
}
