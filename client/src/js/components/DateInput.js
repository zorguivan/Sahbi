import React from 'react';
import * as TimeKeeper from '../services/Time_Keeper';
import {NotificationManager} from 'react-notifications';

export default class DateInput extends React.Component {
    keyUp(e) {
        if (e.which === 13) {
            this.props.addSession();
        }
        if (e.which == 8) {
            let target = e.target.value;
            let mask = '_______';
            target = target.replace(/\D|_|\//g, '');
            target = target.substring(0, target.length - 1);
            if (target.length > 0) {
                target = target + mask.substr(target.length, mask.length);
                e.target.value = this.mask(target);
            } else {
                e.target.value = "";
                this.props.setDate(target);
            }

        }
    }

    mask(target) {
        target = target.replace(/\D|_|\//g, '');
        if (target.indexOf("/") == -1) {
            if (target.length >= 2) {
                target = [
                    target.slice(0, 2),
                    '/',
                    target.slice(2)
                ].join('');
            }
            if (target.length >= 5) {
                target = [
                    target.slice(0, 5),
                    '/',
                    target.slice(5)
                ].join('');
            }
        }
        return target;
    }
    controller(e) {
        let target = e.target.value;

        let mask = '_______';
        target = e.target.value.replace(/\D|_|\//g, '');

        if (target.length == 9) {
            target = target.substring(0, target.length - 1);
        } else if (target.length == 8) {
            let date = this.mask(target);
            if (!TimeKeeper.isValidDate(date)) {
                NotificationManager.error('Date is wrong, Please try again!');
                this.props.reportError();
            } else {
                date = '' + TimeKeeper.stampDate(date);
                this.props.setDate(date);
            }
        } else {
            if (target.length == 1) {
                target = this.mask(target);
                target = target + mask;
            } else if (target.length > 1) {
                target = this.mask(target);
                target = target + mask.substr(target.length - 1, mask.length);
            }
            e.target.value = target;
        }

    }
    render() {
        let dateNow = TimeKeeper.startDate();

        return ( < div > < input type = "text" defaultValue = {
            dateNow
        }
        name = "date" className = "form-control" placeholder = "dd/mm/yyyy" onKeyUp = {
            this.keyUp.bind(this)
        }
        onChange = {
            this.controller.bind(this)
        }
        ref = "date" maxLength = "10" / > < /div>
        )
    }
}

DateInput.propTypes = {
    type: React.PropTypes.string,
    mask: React.PropTypes.string,
    setDate: React.PropTypes.func,
    reportError: React.PropTypes.func,
    addSession: React.PropTypes.func
}
