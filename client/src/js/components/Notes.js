import React from 'react';
import {connect} from 'react-redux';

import * as NotesActions from '../actions/NotesActions';
import SingleNote from './SingleNote';

export class Notes extends React.Component {
    componentWillMount() {
        let projectId = this.props.params.id;
        NotesActions.getNotes(projectId);
    }

    render() {
        let notes = this.props.notes.map((note) => {
            return <SingleNote key={note.id} note={note}/>
        });

        return (
            <div className="jumbotron">

                <div className="tableContainer">
                    <h3>Notes:
                    </h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr className="headerProject">
                                <th>Note</th>
                                <th>id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return {notes: state.notes}
})(Notes);

Notes.propTypes = {
  params: React.PropTypes.object,
  notes: React.PropTypes.array
}
