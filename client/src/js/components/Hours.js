import React from 'react';
import {connect} from 'react-redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import TimeInput from './TimeInput';
import DateInput from './DateInput';

import * as TimeKeeper from '../services/Time_Keeper';
import * as ProjectsActions from '../actions/ProjectsActions';
import * as SessionsActions from '../actions/SessionsActions';


import SessionFrom from './SessionForm';
import SingleSession from './SingleSession';

export class Hours extends React.Component {
    constructor() {
        super();
        this.state = {
            year: new Date().getFullYear()
        }
    }

    componentWillMount() {
        ProjectsActions.getProject(this.props.projectId);
        SessionsActions.getProjectSessions(this.props.projectId);
    }

    componentWillReceiveProps(nextProps) {
        NotificationManager.info('Loading Data..');
        if ( this.state && this.state.searchQuery && nextProps.tracker) {
            let query = this.state.searchQuery;
            SessionsActions.search(query[0], query[1], query[2]);
            SessionsActions.sessionUntrack();
        }
    }

    render() {
        let project = this.props.project;
        let totalHours = 0;

        let sessions = <tr>
            <td colSpan="5" className="danger">
                <center>
                    No Sessions To load</center>
            </td>
        </tr>

        if (this.props.sessions.length > 0) {
            sessions = this.props.sessions;

            sessions.sort(function(a, b) {
                let fTime = TimeKeeper.getTimeAsNum(a.start_time);
                let sTime = TimeKeeper.getTimeAsNum(b.start_time);
                let nfTime = Number(fTime[0] + (fTime[1] / 100));
                let nsTime = Number(sTime[0] + (sTime[1] / 100));

                return nfTime > nsTime
                    ? -1
                    : nfTime < nsTime
                        ? 1
                        : 0;
            });

            sessions.sort(function(a, b) {
                let first = a.date;
                let second = b.date;
                return first > second
                    ? -1
                    : first < second
                        ? 1
                        : 0;

            });
            sessions = this.props.sessions.map((session) => {
                if (session.hours) {
                    let sessionHours = TimeKeeper.getTimeAsNum(session.hours);
                    totalHours = totalHours + Number(sessionHours[0] + (sessionHours[1] / 100));
                    totalHours = Math.round(totalHours * 100) / 100;
                }
                return <SingleSession key={session.id} session={session} projectId={this.props.project.id}/>
            });
        }

        return (
            <div>
                <SessionFrom projectId={project.id}/>
                <div>
                    <NotificationContainer/>
                </div>
                <div className="jumbotron ">
                    <div id="sessionsContainer">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>
                                        <select className="form-control" onChange={this._changed.bind(this)} ref="month" name="month">
                                            <option value="00">All</option>
                                            <option value="01">Jan</option>
                                            <option value="02">Feb</option>
                                            <option value="03">Mar</option>
                                            <option value="04">Apr</option>
                                            <option value="05">May</option>
                                            <option value="06">Jun</option>
                                            <option value="07">Jul</option>
                                            <option value="08">Aug</option>
                                            <option value="09">Sep</option>
                                            <option value="10">Oct</option>
                                            <option value="11">Nov</option>
                                            <option value="12">Dec</option>
                                        </select>
                                    </th>
                                    <th>Year</th>
                                    <th><input type="text" className="form-control" defaultValue={this.state.year} placeholder="Year" onChange={this._changed.bind(this)} ref="year"/></th>
                                    <th className="text-center">
                                        <button type="button" className="btn btn-success" onClick={this._search.bind(this)}>
                                            <span className="glyphicon glyphicon-search"></span>
                                        </button>
                                    </th>
                                    <th className="text-center">
                                        <button type="button" className="btn btn-warning" onClick={this._endSearch.bind(this)}>
                                            <span className="glyphicon glyphicon-refresh"></span>
                                        </button>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Hours</th>
                                    <th>Delete</th>
                                    <th colSpan="2">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessions}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className="info">Total</td>
                                    <td colSpan="4" className="success text-center">{totalHours}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    _changed(e) {
        if (e.target.name == "month") {
            this.setState({month: e.target.value});
        } else {
            if (toString(e.target.value.length) == 4 || toString(e.target.value.length) == 0) {
                this.setState({year: e.target.value});
            }
        }
    }

    _search() {
        if (this.state.month != '00' && this.state.month) {
            let stamp = TimeKeeper.getMonthStartAsStamp(this.state.month, this.state.year);
            let nextStamp = TimeKeeper.getNextMonthAsStamp(this.state.month, this.state.year);
            let id = this.props.project.id;

            this.setState({
                searchQuery: [stamp, nextStamp, id]
            });
            SessionsActions.search(stamp, nextStamp, id);
        } else {
            if (this.state.year.length > 0) {
                let stamp = TimeKeeper.getYearStartAsStamp(this.state.year);
                let nextStamp = TimeKeeper.getNextYearAsStamp(this.state.year);
                let id = this.props.project.id;
                this.setState({
                    searchQuery: [stamp, nextStamp, id]
                });
                SessionsActions.search(stamp, nextStamp, id);
            } else {
                SessionsActions.getProjectSessions(this.props.project.id);
            }
        }
    }
    _endSearch() {
      this.setState({
          searchQuery: []
      });
      SessionsActions.getProjectSessions(this.props.params.id);
    }
}

export default connect((state) => {
    return {project: state.project, sessions: state.sessions, tracker: state.tracker}
})(Hours);

Hours.propTypes = {
  projectId: React.PropTypes.string,
    params: React.PropTypes.object,
    project: React.PropTypes.object,
    sessions: React.PropTypes.array,
    tracker: React.PropTypes.bool
}
