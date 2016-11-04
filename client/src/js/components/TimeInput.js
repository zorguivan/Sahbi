import React from 'react';

export default class TimeInput extends React.Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.value == ""){
        this.setState({value : ''});
      }
    }

    monitorKey(e) {
        if (e.which == 8) {
            let target = e.target;
            let targetValue = target.value.replace(/_/g, '');
            target.focus();
            if (targetValue[targetValue.length - 1] == ':') {
                target.setSelectionRange(targetValue.length - 1, targetValue.length - 1);
            } else {
                target.setSelectionRange(targetValue.length, targetValue.length);
            }
        }
        if ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105)) {
            let target = e.target;
            let targetValue = target.value.replace(/_/g, '');
            target.focus();
            target.setSelectionRange(targetValue.length, targetValue.length);
        }
    }
    mask(target) {
        target = target.replace(/\D|_|:/g, '');
        let mask = '____';
        if (target.indexOf(":") == -1) {
            if (target.length >= 2) {
                target = [
                    target.slice(0, 2),
                    ':',
                    target.slice(2)
                ].join('');
            }
        }
        target = target + mask.substr(target.length - 1, mask.length);
        return target;
    }

    controller(e) {
        let target = e.target.value;
        let mask = '____';
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
                target = this.mask(target);
                target = target + mask;
            } else if (target.length > 1) {
                target = this.mask(target);
                target = target + mask.substr(target.length - 1, mask.length);
            }
        }
        target = this.mask(target);
        let res = target.replace(/\D|_|:/g, '');
        if (res.length > 0) {
            this.setState({value: target});
        } else {
            this.setState({value: ''})
        }
    }

    render() {
        return (
            <div>
                <input name="time" value={this.state.value || ""} className="form-control" onKeyUp={this.monitorKey.bind(this)} ref={node => this.node = node} placeholder="hh:mm" onChange={this.controller.bind(this)} maxLength="6"/>
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

TimeInput.propTypes = {
    onChange: React.PropTypes.func,
    onError: React.PropTypes.func,
    timeInput: React.PropTypes.func
}
