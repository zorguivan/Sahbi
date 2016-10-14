import React from 'react';
import {connect} from 'react-redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import * as TimeKeeper from '../services/Time_Keeper';
import * as ProjectsActions from '../actions/ProjectsActions';
import * as SessionsActions from '../actions/SessionsActions';

import ProjectHeader from './ProjectHeader';
import SessionFrom from './SessionForm';
import SingleSession from './SingleSession';
import Search from './Search';

export default class Project extends React.Component {

    componentWillMount() {
        ProjectsActions.getProject(this.props.params.id);
        SessionsActions.getProjectSessions(this.props.params.id);
    }

    componentWillReceiveProps() {
        NotificationManager.info('Loading Data..');
    }

    render() {
        let project = this.props.project;
        let data = this.props.sessions;
        let totalHours = 0;
        data.sort(function(a, b) {
            let first = TimeKeeper.stampDate(a.date);
            let second = TimeKeeper.stampDate(b.date);
            return first > second ? -1 : first < second  ? 1 : 0;
        });
        data.sort(function(a, b) {
            let fTime = TimeKeeper.getTimeAsNum(a.start_time);
            let sTime = TimeKeeper.getTimeAsNum(b.start_time);
            let nfTime = Number(fTime[0] + (fTime[1] / 100));
            let nsTime = Number(sTime[0] + (sTime[1] / 100));

            return nfTime > nsTime ? -1 : nfTime < nsTime ? 1 : 0;
        });

        let sessions = <tr>
            <td colSpan="5" className="danger">
                <center>
                    No Sessions To load</center>
            </td>
        </tr>

        if (this.props.sessions.length > 0) {
            sessions = this.props.sessions.map((session) => {
              if(session.hours){
                let sessionHours = TimeKeeper.getTimeAsNum(session.hours);
                totalHours = totalHours + Number(sessionHours[0] + (sessionHours[1] / 100));
                totalHours = Math.round(totalHours * 100) / 100;
                }
                return <SingleSession key={session.id} session={session}/>
            });
        }

        return (
            <div>

                <ProjectHeader project={project}/>
                <hr className="style14"/>
                <SessionFrom projectId={project.id}/>
                <div>
                    <NotificationContainer/>
                </div>
                <div className="jumbotron ">
                    <div id="sessionsContainer">
                        <table className="table table-bordered">
                            <thead>
                              <Search id={project.id}/>
                                <tr>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Hours</th>
                                    <th>Delete</th>
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
}

export default connect((state) => {
    return {project: state.project, sessions: state.sessions}
})(Project);


Project.propTypes = {
   params: React.PropTypes.object,
   project: React.PropTypes.object,
   sessions: React.PropTypes.array
}
