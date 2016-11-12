import React from 'react';
import {Button} from 'react-bootstrap';
import TimeInput from './TimeInput';
import DateInput from './DateInput';
import {NotificationManager} from 'react-notifications';

import * as TimeKeeper from '../services/Time_Keeper';
import * as SessionsActions from '../actions/SessionsActions';

export default class SingleSession extends React.Component {
    constructor() {
        super();
        this.state = {
            session: {
                end_time: '',
                hours: ''
            },
            editedSession: {},
            inputState: 'clear',
            editMode: false
        }
    }

    deleteSession(session) {
        SessionsActions.deleteSession(session);
        SessionsActions.getProjectSessions(this.props.projectId);
    }
    setDate(input, dateStamp) {
      this.setState({inputState: 'clear'});
        let state = this.state || {};
        state[input] = dateStamp
        state.editedSession[input] = dateStamp;
        this.setState(state);
    }

    setTime(input, time) {
        if (!this.state.editMode) {
            this.setState({inputState: 'clear'});
            let state = this.state || {};
            state.session[input] = time;
            state.session.hours = TimeKeeper.getTimeDifference(time, this.props.session.start_time);
            this.setState(state);
            this.update();
        } else {
            this.setState({inputState: 'clear'});
            let state = this.state || {};
            if (input == 'end_time') {
                state.editedSession[input] = time;
                state.editedSession.start_time = this.props.session.start_time;
                state.editedSession.hours = TimeKeeper.getTimeDifference(time, this.props.session.start_time);
                this.setState(state);
            } else {
                state.editedSession[input] = time;
                state.editedSession.end_time = this.props.session.end_time;
                state.editedSession.hours = TimeKeeper.getTimeDifference(time, this.props.session.end_time);
                this.setState(state);
            }
        }
    }
    onError() {
        NotificationManager.error('The time is not valid, Please try another');
        this.setState({
            session: {
                ...this.state.session,
                end_time: ''
            }
        });
    }
    editMode(state) {
        this.setState({editMode: state});
        if (!state) {
            SessionsActions.getProjectSessions(this.props.projectId);
        }
    }

    render() {
        if (this.props.session.date.length == 13) {
            this.props.session.date = TimeKeeper.startDate(this.props.session.date);
        }
        let session = this.props.session;

        let sessionDate = '';
        let sessionStartTime = '';
        let sessionEndTime = '';
        let sessionEndTimeInput = '';
        let editButton = '';
        let editButtomAddOn = '';

        if (!this.state.editMode) {
            sessionDate = session.date;
            sessionStartTime = session.start_time;
            sessionEndTime = session.end_time;
            editButton = <td className="text-center">
                <Button type="button" className="btn btn-warning" onClick={this.editMode.bind(this, true)}>
                    <span className="glyphicon glyphicon-edit"></span>
                </Button>
            </td>;
        } else {
            sessionDate  = <DateInput initialValue={session.date} onChange={this.setDate.bind(this, 'date')} value={this.state.dateInput} onError={this.onError.bind(this)}/>
            sessionStartTime = <TimeInput initialValue={session.start_time} onChange={this.setTime.bind(this, 'end_time')} onError={this.onError.bind(this)}/>;
            if (session.end_time.length > 0) {
                sessionEndTime = <TimeInput initialValue={session.end_time} onChange={this.setTime.bind(this, 'end_time')} onError={this.onError.bind(this)}/>;
            }
            editButton = <td className="text-center">
                <Button type="button" className="btn btn-danger" onClick={this.editMode.bind(this, false)}>
                    <span className="glyphicon glyphicon-ban-circle"></span>
                </Button>
            </td>
            editButtomAddOn = <td className="text-center">
                <Button type="button" className="btn btn-success" onClick={this.update.bind(this)}>
                    <span className="glyphicon glyphicon-ok-circle"></span>
                </Button>
            </td>;
        }

        if (session.end_time.length <= 0) {
            sessionEndTimeInput = <TimeInput onChange={this.setTime.bind(this, 'end_time')} onError={this.onError.bind(this)}/>
        }
        return (
            <tr>
                <td>{sessionDate}</td>
                <td>{sessionStartTime}</td>
                <td>{sessionEndTime}{sessionEndTimeInput}</td>
                <td>{session.hours || this.state.session.hours || '--:--'}</td>
                <td className="text-center">
                    <Button type="button" className="btn btn-danger" onClick={this.deleteSession.bind(this, session)}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </Button>
                </td>
                {editButtomAddOn}
                {editButton}
            </tr>
        )
    }
    update() {
      let session = this.props.session;
        if (this.state.editedSession && this.state.editedSession.hours && this.state.editedSession.start_time) {
            if(this.state.editedSession && this.state.editedSession.date){
              session.date = this.state.editedSession.date;
            }
            session.start_time = this.state.editedSession.start_time;
            session.end_time = this.state.editedSession.end_time;
            session.hours = this.state.editedSession.hours;
            SessionsActions.updateSession(session);
            this.editMode(false);
        } else if(this.state.editedSession && this.state.editedSession.date){
          session.date = this.state.editedSession.date;
          SessionsActions.updateSession(session);
          this.editMode(false);
        }
        if (this.state) {
            if (this.state.inputState == 'error' || this.state.session.end_time.length == 0) {
                NotificationManager.error("A field Is Wrong. Please Check your date and times before inserting");
            } else {
                let session = this.props.session;
                session.end_time = this.state.session.end_time;
                session.hours = this.state.session.hours;
                SessionsActions.updateSession(session);
            }
        }
    }
}

SingleSession.propTypes = {
    session: React.PropTypes.object,
    projectId: React.PropTypes.number
}
