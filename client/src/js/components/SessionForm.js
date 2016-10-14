import React from 'react';
import {Button} from 'react-bootstrap';
import DateInput from './DateInput';
import TimeInput from './TimeInput';
import {NotificationManager} from 'react-notifications';
import * as TimeKeeper from '../services/Time_Keeper';
import * as SessionsActions from '../actions/SessionsActions';

export default class SessionForm extends React.Component {

    constructor() {
        super();
        this.state = {
            session: {
                date: TimeKeeper.stampDate(TimeKeeper.startDate()),
                start_time: TimeKeeper.startTime(),
                end_time: '',
                hours: ''
            },
            inputState: 'clear'
        }
    }

    setDate(dateStamp) {
        this.setState({inputState: 'clear'});
        this.setState({
            session: {
                ...this.state.session,
                date: dateStamp
            }
        });
    }
    setTime(validTime, input) {
        this.setState({inputState: 'clear'});
        let state = this.state || {};
        state.session[input] = validTime;
        this.setState(state);
        if (input == 'end_time') {
            let timeDifference = TimeKeeper.getTimeDifference(this.state.session.end_time, this.state.session.start_time);
            this.setState({
                session: {
                    ...this.state.session,
                    hours: timeDifference
                }
            });
        }
    }
    reportError() {
        this.setState({inputState: 'error'});
    }

    render() {

        let timeDifference = '';
        let saveBtn = 'btn btn-primary';
        if (this.state.inputState == 'error') {
            saveBtn = saveBtn + ' disabled';
        }
        if (this.state) {
            if (this.state.session.hours && this.state.session.hours.length > 0) {
                timeDifference = this.state.session.hours;
            }
        }

        return (

            <div className="jumbotron bootstrapDiv">
                <div className="row bootstrapDiv">
                    <form>
                        <table className="table table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End time</th>
                                    <th>Hours</th>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <DateInput setDate={this.setDate.bind(this)} reportError={this.reportError.bind(this)} addSession={this.addSession.bind(this)}/>
                                    </td>
                                    <td>
                                        <TimeInput setTime={this.setTime.bind(this)} input='start_time' reportError={this.reportError.bind(this)} addSession={this.addSession.bind(this)}/>
                                    </td>
                                    <td>
                                        <TimeInput setTime={this.setTime.bind(this)} input='end_time' reportError={this.reportError.bind(this)} addSession={this.addSession.bind(this)}/>
                                    </td>
                                    <td>
                                        {timeDifference}
                                    </td>
                                    <td>
                                        <Button type="button" className={saveBtn} onClick={this.addSession.bind(this)}>Add Session
                                            <span className="glyphicon glyphicon-play"></span>
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        )
    }

    addSession() {
        if (this.state) {
            if (this.state.inputState == 'error') {
                NotificationManager.error("A field Is Wrong. Please Check your date and times before inserting");
            } else {
                if (this.state.session.start_time.length == 0) {
                    NotificationManager.error("The Start Time field cannot be empty, Please enter a time");

                } else if (this.state.session.date.length == 0) {
                    NotificationManager.error("The date field cannot be empty, Please enter a date");

                } else {
                    let session = Object.assign({}, this.state.session);
                    session.project_id = this.props.projectId;
                    SessionsActions.addSession(session);
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
}

SessionForm.propTypes = {
    projectId: React.PropTypes.number
}
