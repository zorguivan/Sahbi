import React from 'react';

export default class DateInput extends React.Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    keyUp(e) {
        if (e.which == 8) {
            let target = e.target.value;
            let mask = '___';
            target = target.replace(/\D|_|:/g, '');
            target = target.substring(0, target.length - 1);
            if (target.length > 0) {
                target = target + mask.substr(target.length, mask.length);
                this.setState({value: this.mask(target)});
            } else {
                this.setState({value: ''});
                this.props.onChange(target);
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
            if (!this.isValidTime(time)) {
                this.props.onError();
            } else {
                this.props.onChange(time);
            }
        } else {
            if (target.length == 1) {
                target = target + mask;
            } else if (target.length > 1) {
                target = target + mask.substr(target.length - 1, mask.length);
            }
        }
        target = this.mask(target);

        this.setState({value: target});
    }
    render() {

        return (
            <div>
                <input name="time" value={this.state.value || ""} className="form-control" placeholder="hh:mm" ref="TimeInput" onKeyUp={this.keyUp.bind(this)} onChange={this.controller.bind(this)} maxLength="6"/>
            </div>
        )
    }

    startTime() {
        let today = new Date();
        let h = today.getHours();
        if (h < 10) {
            h = "0" + h;
        }
        let m = today.getMinutes();
        if (m < 10) {
            m = "0" + m;
        }
        let time = h + ":" + m;
        return time
    }
    isValidTime(time) {
        let numTime = time.split(':');
        numTime[0] = Number(numTime[0]);
        numTime[1] = Number(numTime[1]);

        if (numTime[0] >= 24 || numTime[1] >= 60) {
            return false;
        }
        return true;
    }
}

DateInput.propTypes = {
    onChange: React.PropTypes.func,
    onError: React.PropTypes.func,
}
