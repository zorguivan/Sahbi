import React from 'react';
import {Button} from 'react-bootstrap';
import TimeInput from './TimeInput';
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
            inputState: 'clear'
        }
    }

    deleteSession(session) {
        SessionsActions.deleteSession(session);
    }

    setTime(validTime, input) {
        this.setState({inputState: 'clear'});
        let state = this.state || {};
        state.session[input] = validTime;
        this.setState(state);

        let timeDifference = TimeKeeper.getTimeDifference(this.state.session.end_time, this.props.session.start_time);
        this.setState({
            session: {
                ...this.state.session,
                hours: timeDifference
            }
        });
    }
    reportError() {
        this.setState({inputState: 'error'});
    }
    clearErrors(){
      this.setState({inputState: 'clear'});
    }

    render() {
        if (this.props.session.date.length == 13) {
            this.props.session.date = TimeKeeper.startDate(this.props.session.date);
        }
        let session = this.props.session;
        let EndTimeInput = "";
        if (session.end_time.length <= 0) {
            EndTimeInput = <TimeInput setTime={this.setTime.bind(this)} input='end_time' reportError={this.reportError.bind(this)} addSession={this.update.bind(this)} clearErrors={this.clearErrors.bind(this)}/>
        }
        return (
            <tr>
                <td>{session.date}</td>
                <td>{session.start_time}</td>
                <td>{session.end_time}{EndTimeInput}</td>
                <td>{session.hours || this.state.session.hours || '--:--'}</td>
                <td className="text-center">
                    <Button type="button" className="btn btn-danger" onClick={this.deleteSession.bind(this, session)}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </Button>
                </td>
            </tr>
        )
    }
    update() {
        if (this.state) {
            if (this.state.inputState == 'error' || this.state.session.end_time.length == 0) {
                NotificationManager.error("A field Is Wrong. Please Check your date and times before inserting");
            } else {
                let session = this.props.session;
                session.end_time = this.state.session.end_time;
                session.hours = this.state.session.hours;
                SessionsActions.updateSession(session);
                this.setState({
                    session: {
                        ...this.state.session,
                        end_time: '',
                        hours: ''
                    }
                });
            }
        }
    }
}

SingleSession.propTypes = {
    session: React.PropTypes.object
}
