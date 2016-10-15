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

    setTime(input, time) {
        this.setState({inputState: 'clear'});
        let state = this.state || {};
        state.session[input] = time;
        this.setState(state);

        let timeDifference = TimeKeeper.getTimeDifference(this.state.session.end_time, this.props.session.start_time);
        this.setState({
            session: {
                ...this.state.session,
                hours: timeDifference
            }
        });
        this.update();
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

    render() {
        if (this.props.session.date.length == 13) {
            this.props.session.date = TimeKeeper.startDate(this.props.session.date);
        }
        let session = this.props.session;
        let EndTimeInput = "";
        if (session.end_time.length <= 0) {
            EndTimeInput = <TimeInput onChange={this.setTime.bind(this, 'end_time')} onError={this.onError.bind(this)}/>
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
            }
        }
    }
}

SingleSession.propTypes = {
    session: React.PropTypes.object
}
