import React from 'react';
import * as TimeKeeper from '../services/Time_Keeper';
import {NotificationManager} from 'react-notifications';

export default class DateInput extends React.Component {

    componentDidMount() {
        if (this.props.input == 'start_time') {
            this.refs.TimeInput.focus();
        }
    }
    keyUp(e) {
        if (e.which === 13) {
            if (this.props.clearErrors) {
                this.props.clearErrors();
            }
            this.props.addSession();
            if (this.props.input == 'end_time') {
                this.refs.TimeInput.value = '';
            }
            this.refs.TimeInput.focus();
        }
        if (e.which == 8) {
            let target = e.target.value;
            let mask = '___';
            target = target.replace(/\D|_|:/g, '');
            target = target.substring(0, target.length - 1);
            if (target.length > 0) {
                target = target + mask.substr(target.length, mask.length);
                e.target.value = this.mask(target);
            } else {
                e.target.value = "";
                this.props.setTime(target, this.props.input);
            }

        }
    }

    mask(target) {
        target = target.replace(/\D|_|:/g, '');
        if (target.indexOf(":") == -1) {
            if (target.length >= 2) {
                target = [
                    target.slice(0, 2),
                    ':',
                    target.slice(2)
                ].join('');
            }
        }
        return target;
    }

    controller(e) {
        let target = e.target.value;
        let mask = '___';
        target = e.target.value.replace(/\D|_|:/g, '');
        if (target.length == 5) {
            target = target.substring(0, target.length - 1);
        } else if (target.length == 4) {
            let time = this.mask(target);
            if (!TimeKeeper.isValidTime(time)) {
                NotificationManager.error('time is wrong, Please try again!');
                this.props.reportError();
            } else {
                this.props.setTime(time, this.props.input);
            }
        } else {
            if (target.length == 1) {
                target = target + mask;
            } else if (target.length > 1) {
                target = target + mask.substr(target.length - 1, mask.length);
            }
        }
        target = this.mask(target);

        e.target.value = target;
    }
    render() {

        let time = '';
        if (this.props.input == 'start_time') {
            time = TimeKeeper.startTime();
        }
        return ( < div > < input name = "time" defaultValue = {
            time
        }
        className = "form-control" placeholder = "hh:mm" ref = "TimeInput" onKeyUp = {
            this.keyUp.bind(this)
        }
        onChange = {
            this.controller.bind(this)
        }

        maxLength = "6" / > < /div>
        )
    }
}

DateInput.propTypes = {
    type: React.PropTypes.string,
    mask: React.PropTypes.string,
    setTime: React.PropTypes.func,
    input: React.PropTypes.string,
    reportError: React.PropTypes.func,
    addSession: React.PropTypes.func,
    clearErrors: React.PropTypes.func
}
