import React from 'react';

export default class DateInput extends React.Component {
    constructor() {
        super();
        this.state = {
            value: this.startDate(),
            initialValue: false
        }
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.value == 'Empty'){
        this.setState({value : ''});
        }
      if(nextProps.value == ""){
        this.setState({value : this.startDate()});
      }
    }
    componentWillMount(){
      if(this.props.initialValue && this.props.initialValue.length > 0){
        this.setState({value: '', initialValue: true})
      }
    }

    monitorKey(e){
      if(e.which == 8){
        let target = e.target;
        let targetValue = target.value.replace(/_/g, '');
        target.focus();
        if(targetValue[targetValue.length-1] == '/'){
          target.setSelectionRange(targetValue.length-1, targetValue.length-1);
        } else {
          target.setSelectionRange(targetValue.length, targetValue.length);
        }
      }
      if((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105)){
        let target = e.target;
        let targetValue = target.value.replace(/_/g, '');
        target.focus();
        if(targetValue[targetValue.length-1] == '/'){
          target.setSelectionRange(targetValue.length-1, targetValue.length-1);
        } else {
          target.setSelectionRange(targetValue.length, targetValue.length);
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
        let mask = '_________';
        target = e.target.value.replace(/\D|_|\//g, '');
        if (target.length == 9) {
            target = target.substring(0, target.length - 1);

        } else if (target.length == 8) {
            let date = this.mask(target);
            if (!this.isValidDate(date)) {
                this.props.onError();
            } else {
                date = '' + this.stampDate(date);
                this.props.onChange(date);
                this.setState({value: this.mask(target)})
            }
        } else {
            if (target.length == 1) {
                target = this.mask(target);
                target = target + mask;

            } else if (target.length > 1) {
                target = this.mask(target);
                target = target + mask.substr(target.length - 1, mask.length);

            }

            this.setState({value: target})
        }
    }
    render() {
      let initialValue = ''

      if(this.props.initialValue && this.props.initialValue.length > 0){
        if(this.props.initialValue == "Empty"){
          initialValue = '';
        } else {
        initialValue = this.props.initialValue;
        }
      }
        return (
            <div>
                <input id="date" name="date" className="form-control" value={this.state.value || initialValue} placeholder="dd/mm/yyyy" onKeyUp={this.monitorKey.bind(this)} onChange={this.controller.bind(this)} ref={node => this.node = node} maxLength="11"/>
            </div>
        )
    }

    startDate(timeStamp) {
        var today = new Date();

        if (timeStamp) {
            today = new Date(Number(timeStamp));
        }
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = dd + "/" + mm + "/" + yyyy;
        return today;
    }
    stampDate(date) {
        if (date) {
            if (date.length == 10) {
                date = date.split('/');
                let newDate = date[1] + "," + date[0] + "," + date[2];
                let today = new Date(newDate).getTime();
                return today;
            } else {
                return date;
            }
        } else {
            let today = new Date().getTime();
            return today
        }
    }
    isValidDate(date) {
        if (date.length <= 0) {
            return false;
        }
        let valid = true;
        date = date.split('/');

        let day = Number(date[0]);
        let month = Number(date[1]);
        let year = Number(date[2]);
        if ((month < 1) || (month > 12))
            valid = false;
        else if ((day < 1) || (day > 31))
            valid = false;
        else if (((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day > 30))
            valid = false;
        else if ((month == 2) && (((year % 400) == 0) || ((year % 4) == 0)) && ((year % 100) != 0) && (day > 29))
            valid = false;
        else if ((month == 2) && ((year % 100) == 0) && (day > 29))
            valid = false;
        else if ((month == 2) && (day > 28))
            valid = false;
        else if (isNaN(day) && isNaN(month) && isNaN(year))
            valid = false;
        if (valid == false) {
            return false;
        }
        return true;
    }

}

DateInput.propTypes = {
    onChange: React.PropTypes.func,
    onError: React.PropTypes.func,
    value: React.PropTypes.string,
    initialValue: React.PropTypes.string
}
